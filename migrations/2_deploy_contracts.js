const Token = artifacts.require('Token');
const Market = artifacts.require('Market');

module.exports = function (deployer) {
  deployer.deploy(Token);
  deployer.deploy(Market);
};
