const PRTC = artifacts.require("./Participants.sol");

module.exports = async (callback) => {
  PRTC.setProvider(web3.currentProvider);

  const _prtc = await PRTC.deployed();
  console.log("Participants Address:", _prtc.address);

  await _prtc.reserve();
  console.log("reserve done");

  await _prtc.setBaseURI(
    "https://voidarmada.mypinata.cloud/ipfs/QmcbszgjjcfaA8FNyzqvfq1mW3bUW9AwLmqJY7LmtzWigX/"
  );
  console.log("setBaseURI done");

  await _prtc.setMintingStatus(true);
  console.log("setMintingStatus done");

  callback();
};

// exec ./test/deploy_rinkeby.js
