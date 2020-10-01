require('dotenv').config();

const BN = require('bn.js');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/' + process.env.INFURA_PROJECT_ID);

const UniswapV2Pair = require('../../build/contracts/UniswapV2Pair.json');

exports.getReserves = async function (pairAddress) {
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

this.getReserves('0x77bc559a5a52b2020b63a149d81ffcae7b6c1ec9');
