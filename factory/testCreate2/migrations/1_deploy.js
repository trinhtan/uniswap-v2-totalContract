require('dotenv').config();
const Deployer = artifacts.require('Deployer');

module.exports = async function (deployer) {
	try {
		await deployer.deploy(Deployer, {
			gas: 6721975,
			from: process.env.OPERATOR_ADDRESS
		});
	} catch (err) {
		console.log(err);
	}
};
