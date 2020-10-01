require('dotenv').config();
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');

module.exports = async function (deployer) {
	try {
		await deployer.deploy(UniswapV2Router02, '0xC01a8C3EE884399D9266F3551bc1558A81a95D4e', '0xc778417E063141139Fce010982780140Aa0cD5Ab', {
			gas: 8000000,
			from: process.env.OPERATOR_ADDRESS
		});
	} catch (err) {
		console.log(err);
	}
};
