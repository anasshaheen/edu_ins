class HostingEnvironment {
  static isDevelopment(env: string) {
    return env.toLowerCase() === 'development';
  }

  static isProduction(env: string) {
    return env.toLowerCase() === 'production';
  }

  static isTesting(env: string) {
    return env.toLowerCase() === 'testing';
  }
}

export default HostingEnvironment;
