interface AWSOptions {
  awsAccessKeyId: string;
  awsSecretKey: string;
  bucketRegion: string;
  bucketName: string;
}

const awsOptions: AWSOptions = {
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  awsSecretKey: process.env.AWS_SECRET_KEY as string,
  bucketRegion: process.env.AWS_BUCKET_REGION as string,
  bucketName: process.env.AWS_BUCKET_NAME as string,
};

export default awsOptions;
