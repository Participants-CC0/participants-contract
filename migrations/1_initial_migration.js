const Participants = artifacts.require("Participants");

// mainnet
// var _CommRecipient =  "0x00"
// var _MPRecipient =    "0x00"
// var _DDRecipient =    "0x059f0F7A644a813F2C716E64F3eD23fA0E8e3d6D"
// var _name = "Participants"
// var _symbol = "PRTC"

// testnet
// var _CommRecipient =  "0x00"
// var _MPRecipient =    "0x00"
// var _DDRecipient =    "0x059f0F7A644a813F2C716E64F3eD23fA0E8e3d6D"
// var _name = "PRTC_1"
// var _symbol = "PRTC_1"

// local
var _CommRecipient =  "0x9cD0DE1Ed50bf858aD546A03d4F37B309BA46F09"
var _MPRecipient =    "0xFc2024d5AB8E772f2A036E04AaC9CbC72703a685"
var _DDRecipient =    "0xc75709f0B9e0D8Bb6CcBa801573d4d74C694E10E"
var _name = "PRTC_1"
var _symbol = "PRTC_1"

var _recipients = [_CommRecipient, _MPRecipient, _DDRecipient] 
var _royaltySplits = [4500,4500,1000] 

var baseTokenURI = ""

async function doDeploy(deployer) {

  await deployer.deploy(
    Participants, 
    _name,
    _symbol,
    baseTokenURI,

    _recipients,
    _royaltySplits
  );
  
}


module.exports = function (deployer, network, accounts) {
  deployer.then(async () => {
    await doDeploy(deployer);
  });
};