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

this.getReserves('0x1f232d58e4ff6c04770cea98614f695d3eb4e41b');
