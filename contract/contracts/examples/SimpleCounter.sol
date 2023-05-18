//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SimpleCounter {
    uint public count;

    function get() public view returns (uint) {
        return count;
    }
    
    function increment() public {
        count += 1;
    }

    function decrement() public {
        count -= 1;
    }
}