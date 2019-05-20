const nextConfig = {
  target: 'serverless',
  env: {
    API_URL: process.env.API_URL
  }
}

module.exports = nextConfig;
