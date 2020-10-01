require('dotenv').config();

const BN = require('bn.js');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/' + process.env.INFURA_PROJECT_ID);

const UniswapV2Router02 = require('../build/contracts/UniswapV2Router02.json');
const UniswapV2Router02Address = UniswapV2Router02.networks['3'].address;
const UniswapV2Router02Contract = new web3.eth.Contract(UniswapV2Router02.abi, UniswapV2Router02Address);

const ERC20 = require('../build/contracts/ERC20.json');

const WETH = require('../build/contracts/WETH9.json');
const WETHAddress = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
const WETHContract = new web3.eth.Contract(WETH.abi, WETHAddress);

exports.getWETH = async function () {
	try {
		let result = await UniswapV2Router02Contract.methods.WETH().call();
		console.log(result);
		return result;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

exports.getPairFor = async function (token0, token1) {
	try {
		let result = await UniswapV2Router02Contract.methods.getPairFor(token0, token1).call();
		console.log(result);
		return result;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

exports.approve = async function (tokenAddress, spender, amount) {
	try {
		let operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
		web3.eth.accounts.wallet.add(operator);
		web3.eth.defaultAccount = operator.address;

		const ERC20Contract = new web3.eth.Contract(ERC20.abi, tokenAddress);
		let result = await ERC20Contract.methods.approve(spender, amount).send({
			from: operator.address,
			gas: process.env.ETH_GAS_LIMIT,
			gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1))
		});
		console.log(result);
	} catch (err) {
		console.log(err);
		throw err;
	}
};


exports.addLiquidityETH = async function (
	token,
	amountTokenDesired,
	amountTokenMin,
	amountETHMin,
	to,
	deadline) {
	try {
		await this.approve(token, UniswapV2Router02Address, amountTokenDesired);
		let operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
		web3.eth.accounts.wallet.add(operator);
		web3.eth.defaultAccount = operator.address;

		let transaction = await UniswapV2Router02Contract.methods
			.addLiquidityETH(
				token,
				amountTokenDesired,
				amountTokenMin,
				amountETHMin,
				to,
				deadline)
			.send({
				from: operator.address,
				value: '100000000000000000',
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

exports.swapExactETHForTokens = async function (userPrivateKey, value, amountOutMin, tokens, to, deadline) {
	try {
		let user = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
		web3.eth.accounts.wallet.add(user);
		web3.eth.defaultAccount = user.address;

		let result = await UniswapV2Router02Contract.methods.swapExactETHForTokens(amountOutMin, tokens, to, deadline).send({
			from: user.address,
			value: value,
			gas: process.env.ETH_GAS_LIMIT,
			gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1))
		});
		console.log(result);
	} catch (err) {
		console.log(err);
		throw err;
	}
};

exports.depositWETH = async function (userPrivateKey, value) {
	try {
		let user = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
		web3.eth.accounts.wallet.add(user);
		web3.eth.defaultAccount = user.address;

		let result = await WETHContract.methods.deposit().send({
			from: user.address,
			value: value,
			gas: process.env.ETH_GAS_LIMIT,
			gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1))
		});
		console.log(result);
	} catch (err) {
		console.log(err);
		throw err;
	}
};

// this.getWETH();
// this.getPairFor('0xad6d458402f60fd3bd25163575031acdce07538d', '0xc778417E063141139Fce010982780140Aa0cD5Ab');
// this.addLiquidityETH('0xad6d458402f60fd3bd25163575031acdce07538d', '50000000000000000000', '40000000000000000000', '100000000000000000', '0x02610D24fd42f1237c584b6A699727aBAE7cC04e', '1601439066');
// this.swapExactETHForTokens(process.env.USER1_PRIVATE_KEY, '1000000000000000', '200000000000000000', ['0xc778417E063141139Fce010982780140Aa0cD5Ab', '0xad6d458402f60fd3bd25163575031acdce07538d'], process.env.USER1_ADDRESS, '1601439066');
// this.depositWETH(process.env.USER1_PRIVATE_KEY, '100000000000000000');
