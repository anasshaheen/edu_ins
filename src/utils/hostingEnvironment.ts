class HostingEnvironment {
  static isDevelopment(env: string) {
    return env.toLowerCase() === 'development';
  }

  static isProduction(env: string) {
    return env.toLowerCase() === 'production';
  }
}

export default HostingEnvironment;
