require('dotenv').config();

const BN = require('bn.js');

const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/' + process.env.INFURA_PROJECT_ID);

const UniswapV2Pair = require('../../build/contracts/UniswapV2Pair.json');
const UniswapV2Factory = require('../../build/contracts/UniswapV2Factory.json');

exports.getReserves = async function(pairAddress) {
  try {
    const uniswapV2PairContract = new web3.eth.Contract(UniswapV2Pair.abi, pairAddress);
    let result = await uniswapV2PairContract.methods.getReserves().call();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.factory = async function(pairAddress) {
  try {
    const uniswapV2PairContract = new web3.eth.Contract(UniswapV2Pair.abi, pairAddress);
    let result = await uniswapV2PairContract.methods.factory().call();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getPair = async function(factoryAddress, token0, token1) {
  try {
    const uniswapV2FactoryContract = new web3.eth.Contract(UniswapV2Factory.abi, factoryAddress);
    let result = await uniswapV2FactoryContract.methods.getPair(token0, token1).call();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';

this.getReserves('0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852');
// this.factory('0xD515c37b7e22db51e51Ea4d240F7a143034184f1');
// this.getPair(
//   '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
//   '0xdac17f958d2ee523a2206206994597c13d831ec7',
//   '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
// );
// this.getPair(
//   '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
//   '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
//   '0xdac17f958d2ee523a2206206994597c13d831ec7'
// );
