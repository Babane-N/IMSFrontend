const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:40443';

const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "http://localhost:40080",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
