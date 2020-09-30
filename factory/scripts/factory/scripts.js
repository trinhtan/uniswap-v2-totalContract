require('dotenv').config();

const BN = require('bn.js');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/' + process.env.INFURA_PROJECT_ID);

const UniswapV2Factory = require('../../build/contracts/UniswapV2Factory.json');
const uniswapV2FactoryAddress = UniswapV2Factory.networks['3'].address;
const uniswapV2FactoryContract = new web3.eth.Contract(UniswapV2Factory.abi, uniswapV2FactoryAddress);
console.log(uniswapV2FactoryAddress);

exports.allPairsLength = async function () {
  try {
    let result = await uniswapV2FactoryContract.methods.allPairsLength().call();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getPair = async function (token0, token1) {
  try {
    let result = await uniswapV2FactoryContract.methods.getPair(token0, token1).call();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.createPair = async function (token0, token1) {
  try {
    let operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(operator);
    web3.eth.defaultAccount = operator.address;

    let transaction = await uniswapV2FactoryContract.methods
      .createPair(token0, token1)
      .send({
        from: operator.address,
        gas: process.env.ETH_GAS_LIMIT,
        gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1))
      });
    console.log(transaction);
    return transaction.events.Locked;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// this.allPairsLength()
// this.getPair('0xad6d458402f60fd3bd25163575031acdce07538d', '0xc778417E063141139Fce010982780140Aa0cD5Ab');
// this.createPair('0xad6d458402f60fd3bd25163575031acdce07538d', '0xc778417E063141139Fce010982780140Aa0cD5Ab');
