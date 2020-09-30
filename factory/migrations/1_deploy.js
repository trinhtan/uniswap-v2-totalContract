require('dotenv').config();
const UniswapV2Factory = artifacts.require('UniswapV2Factory');

module.exports = async function (deployer) {
  try {
    await deployer.deploy(UniswapV2Factory, '0xf68F0c27D90bDcde125724D390fF75b3635FF0Ab', {
      gas: 6721975,
      from: process.env.OPERATOR_ADDRESS
    });
  } catch (err) {
    console.log(err);
  }
};
