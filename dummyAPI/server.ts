// dummyAPI.js - a dummy API for testing purposes
// a node.js server that uses express to create a simple API

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';

import {
  EqualifyIssueType,
  EqualifyParams,
  HttpStatus,
} from '../utils/API_Constants.js';
import { randomUUID } from 'crypto';

const app = express();
const port = 3001;

// store the image in memory
// send to a cloud storage service or save to disk
const UPLOAD_PATH = `public/uploads/`;
const upload = multer({ storage: multer.memoryStorage() });

const saveOrUploadImage = (file: multer.File, issueId: string) => {
  // save the image to disk
  const imageName = `${issueId}.${file.mimetype.split('/')[1]}`;
  const imagePath = `${UPLOAD_PATH}/${imageName}`;

  // convert the base64 string to binary data
  const binaryData = Buffer.from(file.buffer, 'base64');

  // write the binary data to the file
  fs.writeFileSync(imagePath, binaryData);

  // return the URL of the image
  const url = `http://localhost:${port}/uploads/${imageName}`;
  console.log(`Image available at: ${url}`);
  return url;
};

app.use(
  cors({
    origin: 'chrome-extension://*',
  })
);

// serve the public folder as static
app.use(express.static('public'));

// verbosely log all requests
app.use(async (req, res, next) => {
  const symbol = '========================================';
  const bodyNoImage = { ...req.body };
  if (bodyNoImage.screenshot) {
    bodyNoImage.screenshot = `screenshot data removed from log for brevity`;
  }
  console.debug(
    `\n${symbol}\nNEW: ${req.method} to ${req.path}
    ${JSON.stringify(req.headers)}:\n${JSON.stringify(
      bodyNoImage,
      null,
      2
    )}\n${symbol}\n\n`
  );
  next();
});

interface Issue extends EqualifyParams {
  id: string;
  issueType: EqualifyIssueType;
  userId: string;
  date: Date;
  screenshot: {
    mimetype: string;
    url?: string;
    size?: number;
  };
}

// define an API endpoint for each issue type
for (let issueEnum in EqualifyIssueType) {
  // get the value of the Enum
  const issueType = EqualifyIssueType[issueEnum];
  const endPoint = `/api${issueType}`;

  // log all the endpoints we are creating
  console.debug(`Creating API endpoint for |${endPoint}|`);

  // handle POST requests to the endpoint
  app.post(`${endPoint}`, upload.single('screenshot'), async (req, res) => {
    // @ts-ignore - multer adds the file to the request object
    const screenshot: multer.File = req.file;
    {
      const screenshotInfo = { ...screenshot };
      if (screenshotInfo.buffer) {
        screenshotInfo.buffer = `Buffer data removed from log for brevity`;
      }
      // log the info about the screenshot and the body
      console.debug(
        `Screenshot: ${
          screenshot
            ? `received: ${JSON.stringify(screenshotInfo, null, 2)}`
            : 'not received'
        }\nBody: ${JSON.stringify(req.body, null, 2)}`
      );
    }

    const issueId = randomUUID();

    const imageUrl = saveOrUploadImage(screenshot, issueId);

    const newIssue: Issue = {
      url: req.body.url,
      body: req.body.body,
      date: new Date(),
      screenshot: {
        mimetype: screenshot.mimetype,
        size: screenshot.size,
        url: imageUrl,
      },
      userId: req.body.userId,
      issueType: issueType,
      id: issueId,
    };

    // send the new issue back to the client
    res.status(HttpStatus.OK).send({
      message: 'Success!',
      issue: newIssue,
    });
  });
}

app.get('/', (req, res) => {
  console.log('GET / is defined');
  res.status(HttpStatus.OK).send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
