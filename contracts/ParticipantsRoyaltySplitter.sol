// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract ParticipantsRoyaltySplitter is PaymentSplitter {
    event PaymentReceivedOnRC(address from, uint256 amount);
    uint256 internal _payeesCount;

    constructor(address[] memory payees, uint256[] memory shares_)
        PaymentSplitter(payees, shares_)
    {
        require(
            payees.length == shares_.length,
            "PaymentSplitter: payees and shares length mismatch"
        );
        require(payees.length > 0, "PaymentSplitter: no payees");

        _payeesCount = payees.length;
    }

    function releaseAll() public payable {
        uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            for (
                uint256 payeeIndex = 0;
                payeeIndex < _payeesCount;
                payeeIndex++
            ) {
                address _payee = payee(payeeIndex);
                release(payable(_payee));
            }
        }
    }

    // Function to receive ether, msg.data must be empty
    receive() external payable override {
        releaseAll();
        emit PaymentReceivedOnRC(msg.sender, msg.value);
    }
}
