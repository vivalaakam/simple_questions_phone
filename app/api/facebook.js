import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default function query(path, fields, token = '') {
  return new Promise((resolve, reject) => {
    const request = new GraphRequest(
      path,
      {
        accessToken: token,
        parameters: {
          fields
        }
      },
      (error, result) => {
        if (error) {
          reject(error.toString());
        } else {
          resolve(result);
        }
      }
    );

    new GraphRequestManager().addRequest(request).start();
  })
}