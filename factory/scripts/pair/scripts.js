require('dotenv').config();

const BN = require('bn.js');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/' + process.env.INFURA_PROJECT_ID);

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

// this.getReserves('0x1c5DEe94a34D795f9EEeF830B68B80e44868d316');
// this.factory('0x1c5DEe94a34D795f9EEeF830B68B80e44868d316');
// this.getPair('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', '0xad6d458402f60fd3bd25163575031acdce07538d', '0xc778417e063141139fce010982780140aa0cd5ab');
