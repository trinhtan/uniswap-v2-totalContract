require('dotenv').config();
const UniswapV2Router01 = artifacts.require('UniswapV2Router01');

module.exports = async function (deployer) {
    try {
        await deployer.deploy(UniswapV2Router01, '0x88038B1a5844F4D86038e8fA2573ED06BBb47a6b', '0xc778417E063141139Fce010982780140Aa0cD5Ab', {
            gas: 6721975,
            from: process.env.OPERATOR_ADDRESS
        });
    } catch (err) {
        console.log(err);
    }
};
