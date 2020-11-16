module.exports = async () => {
  try {
    const DAI_ADDRESS = '0xad6d458402f60fd3bd25163575031acdce07538d';
    const GetTokenPrice = artifacts.require('GetTokenPrice');

    if (process.argv[5] !== 'ropsten') {
      throw new Error('Invalid Network ID!');
    }

    if (process.argv[6] !== 'dai') {
      throw new Error('Invalid token name!');
    }

    let daiAmount = (1 * 10 ** 18).toString();

    const getTokenPriceInstance = await GetTokenPrice.deployed();

    await getTokenPriceInstance.calculateAmountETH(DAI_ADDRESS, daiAmount);

    let ethAmount = parseInt(await getTokenPriceInstance.amountETH());
    console.log(ethAmount);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
