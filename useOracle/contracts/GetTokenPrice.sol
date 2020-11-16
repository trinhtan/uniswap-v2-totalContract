pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";


interface IUniswapPair {
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

interface IUniswapFactory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}

contract GetTokenPrice  {
    using SafeMath for uint256;
    uint256 public amountETH;
    address public WETH;
    address public uniswapV2FactoryAddress;

    constructor(
        address _uniswapV2FactoryAddress, address _weth) public {
        uniswapV2FactoryAddress = _uniswapV2FactoryAddress;
        WETH = _weth;
    }

    function calculateAmountETH(address _token, uint256 _amount) public returns (uint256) {

        address pairAddress = IUniswapFactory(uniswapV2FactoryAddress).getPair(_token, WETH);
        require(pairAddress != address(0), "Pair does not exist!");
        (uint112 _reserve0, uint112 _reserve1,) = IUniswapPair(pairAddress).getReserves();

        uint256 reserve0 = uint256(_reserve0);
        uint256 reserve1 = uint256(_reserve1);

        uint256 amount;
        if(_token < WETH) {
            amount = _amount.mul(reserve1).div(reserve0);
        } else {
            amount = _amount.mul(reserve0).div(reserve1);
        }
        amountETH = amount;
        return amountETH;
    }

    receive() external payable {
    }
}
