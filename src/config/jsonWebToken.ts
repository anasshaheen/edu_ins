interface JWTConfig {
  options: JWTOptions;
  privateKey: string;
}

interface JWTOptions {
  issuer: string;
  subject: string;
  audience: string;
  expiresIn: string;
}

const jwtConfig: JWTConfig = {
  options: {
    issuer: process.env.ISSUER as string,
    subject: process.env.SUBJECT as string,
    audience: process.env.AUDIENCE as string,
    expiresIn: process.env.EXPIRES_IN as string,
  },
  privateKey: process.env.PRIVATE_KEY as string,
};

export default jwtConfig;
