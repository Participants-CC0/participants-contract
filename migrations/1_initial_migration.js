const Participants = artifacts.require("Participants");

// https://docs.google.com/document/d/1GJgqQaO-SqFLC4rO5TnSBbk2mxzLfn_wjFbAQSkEtdc/edit

// mainnet
// var _CommRecipient =  "0x0781c0E18A254ce26a385B5777A3D8dB3beb9109"
// var _MPRecipient =    "0xe7F7001CDAD37ff79e79617d9219296C23270080"
// var _DDRecipient =    "0x059f0F7A644a813F2C716E64F3eD23fA0E8e3d6D"
// var _name = "Participants"
// var _symbol = "Participants"

// testnet
var _CommRecipient = "0x0781c0E18A254ce26a385B5777A3D8dB3beb9109";
var _MPRecipient = "0xe7F7001CDAD37ff79e79617d9219296C23270080";
var _DDRecipient = "0x059f0F7A644a813F2C716E64F3eD23fA0E8e3d6D";
var _name = "PRTC_1";
var _symbol = "PRTC_1";

// local
// var _CommRecipient = "0x9cD0DE1Ed50bf858aD546A03d4F37B309BA46F09";
// var _MPRecipient = "0xFc2024d5AB8E772f2A036E04AaC9CbC72703a685";
// var _DDRecipient = "0xc75709f0B9e0D8Bb6CcBa801573d4d74C694E10E";
// var _name = "PRTC_1";
// var _symbol = "PRTC_1";

var _recipients = [_CommRecipient, _MPRecipient, _DDRecipient];
var _royaltySplits = [4000, 5000, 1000];

var baseTokenURI = "";

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
