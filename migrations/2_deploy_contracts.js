const Token = artifacts.require('Token');
const Market = artifacts.require('Market');

module.exports = async function (deployer) {
  try {
    await deployer.deploy(Token);
    const tokenContract = await Token.deployed();
    console.log('Token address: ', tokenContract.address);

    await deployer.deploy(Market, tokenContract.address);
    const marketContract = await Market.deployed();
    console.log('Market address: ', marketContract.address);
  } catch (error) {
    console.log(error);
  }
};
