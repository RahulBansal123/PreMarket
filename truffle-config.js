const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const secret = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          secret,
          'wss://polygon-mumbai.g.alchemy.com/v2/3bbevXrwGvVIQewPrw-usuVs2V6Dsxgp'
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  contracts_directory: './contracts',
  contracts_build_directory: './abis',
  compilers: {
    solc: {
      version: '0.8.0',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  db: {
    enabled: false,
  },
};
