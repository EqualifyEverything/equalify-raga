const EQUALIFY_API_URL = 'http://localhost:3001/api';

// define an Enum for the HTTP status codes
enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// define an Enum for types of issues
enum EqualifyIssueType {
  META_ISSUE = '/issue/meta',
  IMAGE_ISSUE = '/issue/image',
  ELEMENT_ISSUE = '/issue/element',
}

// define the parameters that the API expects
interface EqualifyParams {
  url: string;
  body: any;
}

export { EQUALIFY_API_URL, EqualifyParams, EqualifyIssueType, HttpStatus };
