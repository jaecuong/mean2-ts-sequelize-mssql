import * as path from 'path';
// http://www.restapitutorial.com/httpstatuscodes.html
export interface StatusCodeConfig {
  Informational: {
    100: string,
    101: string,
    102: string,
  };
  Success: {
    200: string,
    201: string,
    202: string,
  };
}

export const statusCodeConfig: StatusCodeConfig = {
  Informational: {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing (WebDAV)"
  },
  Success: {
    200: "OK",
    201: "Created",
    202: "Accepted"
  }
};
