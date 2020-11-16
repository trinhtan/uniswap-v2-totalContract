require('dotenv').config();
const GetTokenPrice = artifacts.require('GetTokenPrice');
const WETH = '0xc778417E063141139Fce010982780140Aa0cD5Ab';

module.exports = async function(deployer) {
  try {
    await deployer.deploy(
      GetTokenPrice,
      '0xFa900667AFa28FC7f979d4B2F4C18eB786Ff803f' /* Replace your factory address at here */,
      WETH
    );
  } catch (err) {
    console.log(err);
  }
};
