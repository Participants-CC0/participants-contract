const Participants = artifacts.require("Participants");

// https://docs.google.com/document/d/1GJgqQaO-SqFLC4rO5TnSBbk2mxzLfn_wjFbAQSkEtdc/edit

// mainnet
// //var _CommRecipient =  "0x0781c0E18A254ce26a385B5777A3D8dB3beb9109"
// var _MPRecipient =    "0xe7F7001CDAD37ff79e79617d9219296C23270080"
// var _DDRecipient =    "0x059f0F7A644a813F2C716E64F3eD23fA0E8e3d6D"
// var _name = "Participants"
// var _symbol = "Participants"
// var tokens = ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"]; //mainnet wETH

// rinkeby
// var _CommRecipient = "0x0781c0E18A254ce26a385B5777A3D8dB3beb9109";
var _MPRecipient = "0xe7F7001CDAD37ff79e79617d9219296C23270080";
var _DDRecipient = "0x059f0F7A644a813F2C716E64F3eD23fA0E8e3d6D";
var _name = "PRTC_11";
var _symbol = "PRTC_11";
var tokens = ["0xc778417E063141139Fce010982780140Aa0cD5Ab"]; //rinkeby wETH

// local
// // var _CommRecipient = "0x9cD0DE1Ed50bf858aD546A03d4F37B309BA46F09";
// var _MPRecipient = "0xFc2024d5AB8E772f2A036E04AaC9CbC72703a685";
// var _DDRecipient = "0xc75709f0B9e0D8Bb6CcBa801573d4d74C694E10E";
// var _name = "PRTC_1";
// var _symbol = "PRTC_1";
// var tokens = [];

var _recipients = [_MPRecipient, _DDRecipient];
var _royaltySplits = [8000, 2000]; //over 5%

var baseTokenURI = "";

async function doDeploy(deployer) {
  await deployer.deploy(
    Participants,
    _name,
    _symbol,
    baseTokenURI,

    _recipients,
    _royaltySplits,

    tokens
  );
}

module.exports = function (deployer, network, accounts) {
  deployer.then(async () => {
    await doDeploy(deployer);
  });
};
