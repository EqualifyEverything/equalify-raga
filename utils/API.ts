import {
  EQUALIFY_API_URL,
  EqualifyParams,
  EqualifyIssueType,
  HttpStatus,
} from './API_Constants';

// define a function that captures a screenshot of the current tab and returns a Promise that resolves a Blob
// FIXME: move this to a utils file
export const captureScreenShot = (): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // take a screenshot of the current tab
    chrome.tabs.captureVisibleTab((image) => {
      // open a new chrome tab with the image
      // chrome.tabs.create({ url: image });

      // image is a base64 string
      // convert it to a Blob
      // get the base64 string without the header
      const b64Str = image.slice("'data:image/jpeg;base64".length);
      const byteCharacters = atob(b64Str);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });

      resolve(blob);
    });
  });
};

const getUserID = () => {
  return '1234';
};

const getAuthToken = () => {
  // TODO: get the auth token from the user's session
  return getUserID();
};

/**
 * Send parameters to the Equalify API
 * @param {EqualifyIssueType} issueType - the type of issue
 * @returns {Promise<number>} - HTTP status code
 */
const sendParametersToAPI = (
  issueType: EqualifyIssueType,
  opts: EqualifyParams
) => {
  return new Promise((resolve, reject) => {
    const params = {
      userId: getUserID(),
      ...opts,
    };

    // get the screen shot of the current tab
    captureScreenShot()
      .then((image) => {
        // attach the image to the body
        const body = new FormData();
        body.append('screenshot', image);
        // append the rest of the parameters
        Object.keys(params).forEach((key) => {
          const val = params[key as keyof EqualifyParams];
          body.append(key, val);
        });

        const dstUrl = EQUALIFY_API_URL + issueType;
        const headers = {
          Authorization: `Bearer ${getAuthToken()}`,
        };
        // log verbosely the dstUrl and params
        console.debug(`POST to: ${dstUrl}\n${JSON.stringify(body, null, 2)}`);

        return fetch(dstUrl, {
          method: 'POST',
          body,
          headers,
        });
      })
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// make a module and export the necessary variables
export { sendParametersToAPI };
