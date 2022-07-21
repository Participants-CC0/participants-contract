const PRTC = artifacts.require("./Participants.sol")

module.exports = async (callback)=> {
  PRTC.setProvider(web3.currentProvider);

  const _prtc = await PRTC.deployed()
  console.log("Participants Address:", _prtc.address)
  
  await va.setSaleStatus(true)
  console.log("setSaleStatus done")

  await va.setBaseURI("https://participants.mypinata.com/XXXXX/")
  console.log("setBaseURI done")
  
  callback();
}

// exec ./test/deploy_local.js