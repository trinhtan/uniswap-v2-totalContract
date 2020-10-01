const eth = require('ethereumjs-util');
const Web3 = require('web3');
const web3 = new Web3();

const UniswapV2Pair = require('../build/contracts/UniswapV2Pair.json');

// 0xff ++ deployingAddress is fixed:
var deployingAddress = '0xffC01a8C3EE884399D9266F3551bc1558A81a95D4e';

// Hash of the bytecode is fixed. Calculated with eth.keccak256():
var bytecodeHash = eth.keccak256(UniswapV2Pair.bytecode).toString('hex');

console.log(bytecodeHash);

var saltBytes = web3.utils.soliditySha3('0xad6d458402f60fd3bd25163575031acdce07538d', '0xc778417E063141139Fce010982780140Aa0cD5Ab');

var salt = String(saltBytes).substr(2);

var concatString = deployingAddress.concat(salt).concat(bytecodeHash);

// 3. Hash the resulting string
var hashed = eth.bufferToHex(eth.keccak256(concatString));
var address = '0x' + hashed.substr(26);

console.log(address);
