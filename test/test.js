const assert = require("chai").assert;
const truffleAssert = require("truffle-assertions");
const Participants = artifacts.require("./Participants.sol");

const publicAcc1 = "0x9BE09E3bfB75f1243cbaaC6E9c8c32EE9b4D119b";
const ownerAcc = "0xf3c636425380f74E1EdB826d7B7bB5a0BdA3F5CB";

const tenEther = web3.utils.toWei("10", "ether");
const oneEther = web3.utils.toWei("1", "ether");

contract("Participants", async (accounts) => {
  var instance;

  it("setup contract", async () => {
    instance = await Participants.deployed();
    console.log("Participants:", instance.address);
  });

  it("set token URIs", async () => {
    let tx = await instance.setBaseURI(
      "https://participants.mypinata.cloud/ipfs/XXX/"
    );
    truffleAssert.passes(tx);
  });

  it("Should reserve 33 tokens for owner", async () => {
    let tx = await instance.reserve();
    truffleAssert.passes(tx);

    let _balance = await instance.balanceOf(ownerAcc);
    assert.equal(_balance, 33, "Balance should be 33.");
  });

  it("Shouldn't mint while minting is not active", async () => {
    await truffleAssert.fails(instance.mint({ from: publicAcc1 }));
  });

  it("Minting activated", async () => {
    await truffleAssert.passes(instance.setMintingStatus(true));
  });

  it("Should mint 1 token", async () => {
    const tx = await instance.mint({ from: publicAcc1 });
    truffleAssert.eventEmitted(tx, "Transfer");

    const _balance = await instance.balanceOf(publicAcc1);
    assert.equal(_balance, 1, "Balance should be 1.");
  });

  it("Shouldn't mint while balance is 1", async () => {
    await truffleAssert.fails(instance.mint({ from: publicAcc1 }));
  });

  // secondary market checks
  it("supportsInterface: royaltyInfo", async () => {
    const tx = await instance.supportsInterface("0x2a55205a");
    assert.equal(tx, true);
  });

  it("royaltyAmount should be 1Eth", async () => {
    const tx = await instance.royaltyInfo(publicAcc1, tenEther);
    assert.equal(tx[1], oneEther, "Rpyalty amount should be 1 ether");
    // console.log(tx);
  });
});
