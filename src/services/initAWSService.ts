import AWS from 'aws-sdk';

const { aws: awsOptions } = require('../config');

export default () => {
  AWS.config.update({
    region: awsOptions.bucketRegion,
    accessKeyId: awsOptions.awsAccessKeyId,
    secretAccessKey: awsOptions.awsSecretKey,
  });
  AWS.config.apiVersions = {
    s3: '2006-03-01',
  };
};
