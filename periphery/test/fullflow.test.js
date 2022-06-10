const hardhat = require('hardhat');
const { ethers } = hardhat;
const { expect } = require('chai');

describe('Test create', async () => {
  let deployer, alice, bob;
  let factory, router, weth, usdt, pair;

  beforeEach(async () => {
    [deployer, alice, bob] = await ethers.getSigners();

    let Factory = await ethers.getContractFactory('UniswapV2Factory');
    factory = await Factory.connect(deployer).deploy(deployer.address);

    let WETH = await ethers.getContractFactory('WETH9');

    weth = await WETH.connect(deployer).deploy();

    let Router = await ethers.getContractFactory('UniswapV2Router02');
    router = await Router.connect(deployer).deploy(factory.address, weth.address);

    let USDT = await ethers.getContractFactory('ERC20');
    usdt = await USDT.connect(deployer).deploy('1000000000000000000000000000'); // 1,000,000,000 USDT

    console.log('Factory address: ' + factory.address.toLowerCase());
    console.log('WETH address: ', weth.address);
    console.log('Router address: ', router.address);
    console.log('USDT address: ', usdt.address);
  });

  it('Check', async () => {
    // create pair ETH-USDT
    await factory.connect(deployer).createPair(weth.address, usdt.address);

    pair = await ethers.getContractAt(
      'UniswapV2Pair',
      await factory.getPair(weth.address, usdt.address)
    );

    console.log('ETH-USDT pair address: ', pair.address);

    // add liquidity for ETH-USDT pool, 50 ETH and 100,000 USDT
    await usdt.connect(deployer).approve(router.address, '100000000000000000000000'); // 200,000 USDT
    await router
      .connect(deployer)
      .addLiquidityETH(
        usdt.address,
        '100000000000000000000000',
        '100000000000000000000000',
        '50000000000000000000',
        deployer.address,
        999999999999,
        { value: '50000000000000000000' }
      );

    console.log(
      '\nETH-USDT LP balance of liquidity provide: ',
      parseInt(await pair.balanceOf(deployer.address))
    );

    // alice swap 1 eth get at least 1900 usdt
    console.log(
      '\nAlice USDT balance before swap: ',
      parseInt(await usdt.balanceOf(alice.address))
    );
    await router.connect(alice).swapExactETHForTokens(
      '1900000000000000000000',
      [weth.address, usdt.address],
      alice.address,
      99999999999,
      { value: '1000000000000000000' } // 1 ETH
    );
    console.log('Alice USDT balance after swap: ', parseInt(await usdt.balanceOf(alice.address)));

    // bob swap 2100 usdt for at least 1 eth
    await usdt.connect(deployer).transfer(bob.address, '2100000000000000000000'); // fund 2000 usdt from deployer
    await usdt.connect(bob).approve(router.address, '2100000000000000000000');
    console.log(
      '\nBob ETH balance before swap: ',
      parseInt(await ethers.provider.getBalance(bob.address))
    );
    await router
      .connect(bob)
      .swapExactTokensForETH(
        '2100000000000000000000',
        '1000000000000000000',
        [usdt.address, weth.address],
        bob.address,
        9999999999
      );

    console.log(
      'Bob ETH balance after swap: ',
      parseInt(await ethers.provider.getBalance(bob.address))
    );
  });
});
