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
    issuer: <string>process.env.ISSUER,
    subject: <string>process.env.SUBJECT,
    audience: <string>process.env.AUDIENCE,
    expiresIn: <string>process.env.EXPIRES_IN,
  },
  privateKey: <string>process.env.PRIVATE_KEY,
};

export default jwtConfig;
