import { expect } from "chai";
import { ethers } from "hardhat";
import { BluumFactory, BluumNft, AccessManager, Whitelist } from "../../typechain-types";

describe("BluumFactory contract global testing", function () {
  let factory: BluumFactory;
  let accessManager: AccessManager;
  let whitelist: Whitelist;
  let owner: any, addr1: any, addr2: any;

  before(async () => {
    // Deploy the AccessManager contract
    const AccessManager = await ethers.getContractFactory("AccessManager");
    accessManager = (await AccessManager.deploy()) as AccessManager;
    await accessManager.deployed();

    // Deploy the Whitelist contract
    const Whitelist = await ethers.getContractFactory("Whitelist");
    whitelist = (await Whitelist.deploy(accessManager.address)) as Whitelist;
    await whitelist.deployed();

   // Deploy an implementation of BluumNft contract
   const BluumNftImpl = await ethers.getContractFactory("BluumNft");
   const bluumNftImpl = (await BluumNftImpl.deploy()) as BluumNft;
   await bluumNftImpl.deployed();

   // Deploy and initialize BluumFactory contract
   const BluumFactory = await ethers.getContractFactory("BluumFactory");
   factory = (await BluumFactory.deploy(bluumNftImpl.address, accessManager.address, whitelist.address)) as BluumFactory;
   await factory.deployed();

    // Get Signers
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should not create a new collection as the caller is not an admin", async () => {
    const collectionName = "Test Collection";
    const collectionSymbol = "TST";
    await expect(
      factory.connect(addr1).deployCollection(collectionName, collectionSymbol)
    ).to.be.revertedWithCustomError(factory, "OnlyAdminCanCall");
  });

  it("Should not create a new collection as the collection name is null", async () => {
    const collectionName = "";
    const collectionSymbol = "TST";
    await expect(
      factory.deployCollection(collectionName, collectionSymbol)
    ).to.be.revertedWithCustomError(await ethers.getContractFactory("BluumNft"), "NullValue");
  });

  it("Should not create a new collection as the collection symbol is null", async () => {
    const collectionName = "Test Collection";
    const collectionSymbol = "";
    await expect(
      factory.deployCollection(collectionName, collectionSymbol)
    ).to.be.revertedWithCustomError(await ethers.getContractFactory("BluumNft"), "NullValue");
  });

  it("Should create a new collection successfully", async () => {
    const collectionName = "Test Collection";
    const collectionSymbol = "TST";

    await expect(
      await factory.deployCollection(collectionName, collectionSymbol)
    )
      .to.emit(factory, "NewCollectionDeployed")
      .withArgs(await factory.getCollectionAddress(0), collectionName, collectionSymbol);

    const deployedCollectionAddress = await factory.getCollectionAddress(0);
    expect(await factory.isCollectionAddress(deployedCollectionAddress)).to.be.true;

    const deployedCollection = (await ethers.getContractAt("BluumNft", deployedCollectionAddress)) as BluumNft;
    expect(await deployedCollection.name()).to.equal(collectionName);
    expect(await deployedCollection.symbol()).to.equal(collectionSymbol);
    expect(await factory.getCollectionsNumber()).to.equal(1);
  });

  it("Should create a second collection", async () => {
    const collectionName = "Test Collection 2";
    const collectionSymbol = "TST 2";
    await expect(
      await factory.deployCollection(collectionName, collectionSymbol)
    )
      .to.emit(factory, "NewCollectionDeployed")
      .withArgs(await factory.getCollectionAddress(1), collectionName, collectionSymbol)
    expect(await factory.getCollectionsNumber()).to.equal(2);
  });

  it("Should return an array of collections", async () => {
    const collections = await factory.getCollectionsAddresses();
    expect(collections.length).to.equal(2);
  });
  
});
