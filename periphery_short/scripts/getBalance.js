module.exports = async () => {
  try {
    const { TOKENS, WETH } = require('../constant');
    const ERC20 = artifacts.require('ERC20');

    if (process.argv[5] !== 'ropsten') {
      throw new Error('Invalid Network ID!');
    }

    if (process.argv[6] !== 'dai') {
      throw new Error('Invalid token name!');
    }

    let tokenAddress = TOKENS[process.argv[6]].address;
    let daiInstance = await ERC20.at(tokenAddress);

    let result = parseInt(await daiInstance.balanceOf(process.env.OPERATOR_ADDRESS));

    console.log(result);

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
