pragma solidity ^0.5.12;

contract Test {
    address public owner;
    uint256 public A;

    modifier onlyTestOwner() {
        require(msg.sender == owner, "FORBIDEN");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function name() external view returns (string memory) {
        return "TEST CONTRACT";
    }

    function updateA(uint256 _A) public onlyTestOwner {
        A = _A;
    }

    function changeOwner(address _newOwner) public onlyTestOwner {
        owner = _newOwner;
    }
}
