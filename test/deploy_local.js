const PRTC = artifacts.require("./Participants.sol");

module.exports = async (callback) => {
  PRTC.setProvider(web3.currentProvider);

  const _prtc = await PRTC.deployed();
  console.log("Participants Address:", _prtc.address);

  await _prtc.reserve({ from: "0xf3c636425380f74E1EdB826d7B7bB5a0BdA3F5CB" });
  console.log("reserve done");

  await _prtc.setBaseURI("https://voidarmada.mypinata.cloud/ipfs/QmcbszgjjcfaA8FNyzqvfq1mW3bUW9AwLmqJY7LmtzWigX/", {
    from: "0xf3c636425380f74E1EdB826d7B7bB5a0BdA3F5CB",
  });
  console.log("setBaseURI done");

  await _prtc.setMintingStatus(true, {
    from: "0xf3c636425380f74E1EdB826d7B7bB5a0BdA3F5CB",
  });
  console.log("setMintingStatus done");

  callback();
};

// exec ./test/deploy_local.js
