module.exports = {
  options: {
    issuer: process.env.ISSUER,
    subject: process.env.SUBJECT,
    audience: process.env.AUDIENCE,
    expiresIn: process.env.EXPIRES_IN
  },
  privateKey: process.env.PRIVATE_KEY
};
