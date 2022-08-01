const PRTC = artifacts.require("./Participants.sol");

module.exports = async (callback) => {
  PRTC.setProvider(web3.currentProvider);

  const p = await PRTC.deployed();
  //   const p = await Participants.deployed();
  console.log("Participants Address:", _prtc.address);

  await p.setBaseURI("https://participants.mypinata.cloud/ipfs/QmXKwGdR84GYX7R78wycV8WGannbMuMyFV7i8SugsQnG4A/");
  console.log("setBaseURI done");

  await p.reserve();
  console.log("reserve done");

  await p.setMintingStatus(true);
  console.log("setMintingStatus done");

  callback();
};

// exec ./test/deploy_rinkeby.js
