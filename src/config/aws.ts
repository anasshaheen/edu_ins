interface AWSOptions {
  awsAccessKeyId: string;
  awsSecretKey: string;
  bucketRegion: string;
  bucketName: string;
}

const awsOptions: AWSOptions = {
  awsAccessKeyId: <string>process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: <string>process.env.AWS_SECRET_KEY,
  bucketRegion: <string>process.env.AWS_BUCKET_REGION,
  bucketName: <string>process.env.AWS_BUCKET_NAME,
};

export default awsOptions;
