const AWS = require('aws-sdk');

const { aws: awsOptions } = require('../config');

const initAWSService = () => {
  AWS.config.update({
    region: awsOptions.bucketRegion,
    accessKeyId: awsOptions.awsAccessKeyId,
    secretAccessKey: awsOptions.awsSecretKey
  });
  AWS.config.apiVersions = {
    s3: '2006-03-01'
  };
};

module.exports = initAWSService;
