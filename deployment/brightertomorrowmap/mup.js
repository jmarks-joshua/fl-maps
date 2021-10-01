var secret = require('./mup-secrets.json');

module.exports = {
  servers: {
    one: {
      host: '178.62.233.44',
      username: 'deploy',
      pem: './travis-ssh-key',
    }
  },
  app: {
    name: 'brightertomorrowmap',
    path: '../../.',
    docker: {
      image: 'abernix/meteord:node-8.4.0-base'
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      ROOT_URL: 'https://fl-maps.brightertomorrowmap.com',
      MONGO_URL: secret.mongo_url,
    }
  },
  proxy: {
    domains: 'brightertomorrowmap.com,www.brightertomorrowmap.com',
    ssl: {
      letsEncryptEmail: 'contact@focallocal.org',
      forceSSL: true
    }
  }
};
