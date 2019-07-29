import AWS from 'aws-sdk';

import { aws as awsOptions } from '../config';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

function uploadFile(
  fileName: string,
  stream: Buffer,
): Promise<AWS.S3.ManagedUpload.SendData> {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    const params: PutObjectRequest = {
      Bucket: awsOptions.bucketRegion,
      Key: `/${fileName}`,
      ACL: 'public-read',
      Body: stream,
    };

    s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export default uploadFile;
