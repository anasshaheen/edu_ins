import AWS from 'aws-sdk';

import { aws as awsOptions } from '../config';

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
