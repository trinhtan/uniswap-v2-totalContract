module.exports = async () => {
  try {
    const { TOKENS, DEADLINE } = require('../constant');
    const UniswapV2Router02 = artifacts.require('UniswapV2Router02');
    const ERC20 = artifacts.require('ERC20');

    if (process.argv[5] !== 'ropsten') {
      throw new Error('Invalid Network ID!');
    }

    if (process.argv[6] !== 'dai') {
      throw new Error('Invalid token name!');
    }

    let tokenAddress = TOKENS[process.argv[6]].address;
    let amountDesired = TOKENS[process.argv[6]].amountDesired;
    let amountMin = TOKENS[process.argv[6]].amountMin;
    let amountETHMin = TOKENS[process.argv[6]].amountETHMin;
    let deadline = DEADLINE;

    const uniswapV2Router02Instance = await UniswapV2Router02.deployed();
    const erc20Instance = await ERC20.at(tokenAddress);

    await erc20Instance.approve(uniswapV2Router02Instance.address, amountDesired);

    await uniswapV2Router02Instance.addLiquidityETH(
      tokenAddress,
      amountDesired,
      amountMin,
      amountETHMin,
      process.env.OPERATOR_ADDRESS,
      deadline,
      { value: amountETHMin }
    );

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
