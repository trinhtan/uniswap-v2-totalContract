const eth = require('ethereumjs-util');

// 0xff ++ deployingAddress is fixed:
var deployerAddress = '0xff48599EBbC73d075A3Bd3409cDFfD9FB910F99611';

var Test = require('./build/contracts/Test.json');

// Hash of the bytecode is fixed. Calculated with eth.keccak256():
var bytecodeHash = eth.keccak256(Test.bytecode).toString('hex');

// In each loop, i is the value of the salt we are checking
for (var i = 0; i < 72057594037927936; i++) {
    // 1. Convert i to hex, and it pad to 32 bytes:
    var saltToBytes = i.toString(16).padStart(64, '0');

    // 2. Concatenate this between the other 2 strings
    var concatString = deployerAddress.concat(saltToBytes).concat(bytecodeHash);

    // 3. Hash the resulting string
    var hashed = eth.bufferToHex(eth.keccak256(concatString));

    // 4. Remove leading 0x and 12 bytes
    // 5. Check if the result contains badc0de
    if (hashed.substr(26).endsWith('4668')) {
        var address = '0x' + hashed.substr(26);
        console.log('SALTY: ', '0x' + saltToBytes);
        console.log('EXPECTED ADDRESS: ', address);
        break;
    }
}