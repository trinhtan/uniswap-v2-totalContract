require('dotenv').config();
const UniswapV2Factory = artifacts.require('UniswapV2Factory');

module.exports = async function (deployer) {
  try {
    await deployer.deploy(UniswapV2Factory, process.env.OPERATOR_ADDRESS, {
      gas: 6721975,
      from: process.env.OPERATOR_ADDRESS
    });
  } catch (err) {
    console.log(err);
  }
};
