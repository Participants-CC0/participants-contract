const PRTC = artifacts.require("./Participants.sol");

module.exports = async (callback) => {
  PRTC.setProvider(web3.currentProvider);

  const p = await PRTC.deployed();
  //   const p = await Participants.deployed();
  console.log("Participants Address:", _prtc.address);

  await p.setBaseURI("https://participants.mypinata.cloud/ipfs/Qmb8VHYQSihSVm3PngQuvUJrQY8rofLTLm6dhuBcKnDgXA/");
  console.log("setBaseURI done");

  await p.setMintingStatus(true);
  console.log("setMintingStatus done");

  await p.reserve();
  console.log("reserve done");

  callback();
};

// exec ./test/deploy_rinkeby.js
