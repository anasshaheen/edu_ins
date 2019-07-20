const AWS = require('aws-sdk');

const { aws: awsOptions } = require('../config');

const uploadFile = (fileName, stream) => {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    const params = {
      Bucket: awsOptions.bucketRegion,
      Key: `/${fileName}`,
      ACL: 'public-read',
      Body: stream
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = uploadFile;
