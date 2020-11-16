require('dotenv').config();
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');
const { WETH } = require('../constant');

module.exports = async function(deployer) {
  try {
    await deployer.deploy(
      UniswapV2Router02,
      '0xFa900667AFa28FC7f979d4B2F4C18eB786Ff803f' /* Replace your factory address at here */,
      WETH,
      {
        gas: 8000000,
        from: process.env.OPERATOR_ADDRESS,
      }
    );
  } catch (err) {
    console.log(err);
  }
};
