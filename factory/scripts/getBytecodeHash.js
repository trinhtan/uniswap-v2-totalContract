const eth = require('ethereumjs-util');
const Web3 = require('web3');
const web3 = new Web3();

const UniswapV2Pair = require('../build/contracts/UniswapV2Pair.json');

// Hash of the bytecode is fixed. Calculated with eth.keccak256():
var bytecodeHash = eth.keccak256(UniswapV2Pair.bytecode).toString('hex');

console.log(bytecodeHash);
