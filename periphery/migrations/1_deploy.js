require('dotenv').config();
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');

module.exports = async function(deployer) {
  try {
    await deployer.deploy(
      UniswapV2Router02,
      '0x334548862FDCFE59188EED7F6a4Ef7bdFC2869E3',
      '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      {
        gas: 7000000,
        from: process.env.OPERATOR_ADDRESS,
      }
    );
  } catch (err) {
    console.log(err);
  }
};
