import { ethers } from "hardhat";
import { expect } from "chai";
import { deployContracts, Log } from "../helpers/core";
import { AccessManager, BluumFactory, BluumNftV2, BluumNftV2__factory, BluumNft } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Upgrade BluumNft", () => {

    let owner: SignerWithAddress;
    let teamWallet: SignerWithAddress;
    let addrs: SignerWithAddress[];
    let bluumNftV2: BluumNftV2;
    let bluumNftV1: BluumNftV2;
    let bluumFactory: BluumFactory;

    before(async () => {
        [owner, teamWallet, ...addrs] = await ethers.getSigners();
        const CONTRACTS = await deployContracts(owner, teamWallet);
        bluumFactory = CONTRACTS.bluumFactory;
    });

    it("Should deploy a new collection", async () => {
        Log.info("Deploying a new collection");
        await bluumFactory.deployCollection(
            "Bluum NFT",
            "BLT",
        )
        const collectionAddress = await bluumFactory.getCollectionAddress(0);
        bluumNftV1 = await ethers.getContractAt("BluumNftV2", collectionAddress) as BluumNftV2;
        Log.info(`New collection is deployed to ${bluumNftV1.address}`);
    });

    it("Should revert when the sayHello method is called as the contract implementation is not yet upgraded", async () => {
        await expect(bluumNftV1.sayHello()).to.be.reverted;
    }); 

    it("Should not upgrade the BluumNft implementation contract as the caller is not the owner", async () => {
        Log.info("Upgrading the BluumNft contract implementation");
        let BluumNftV2Factory: BluumNftV2__factory = await ethers.getContractFactory("BluumNftV2");
        let bluumNftV2Implementation = await BluumNftV2Factory.deploy();
        await bluumNftV2Implementation.deployed();
        Log.debug(`BluumNft V2 contract implementation is deployed to ${bluumNftV2Implementation.address}`)
        await expect(bluumFactory.connect(addrs[0]).setBluumNftContractImplementation(bluumNftV2Implementation.address)).to.be.reverted;
        expect(await bluumFactory.bluumNftContractImplementation()).to.not.be.eq(bluumNftV2Implementation.address);
        Log.info("BluumNft contract implementation is not upgraded");
    });

    it("Should upgrade the BluumNft implementation contract", async () => {
        Log.info("Upgrading the BluumNft contract implementation");
        let BluumNftV2Factory: BluumNftV2__factory = await ethers.getContractFactory("BluumNftV2");
        let bluumNftV2Implementation = await BluumNftV2Factory.deploy();
        await bluumNftV2Implementation.deployed();
        Log.debug(`BluumNft V2 contract implementation is deployed to ${bluumNftV2Implementation.address}`)
        await bluumFactory.setBluumNftContractImplementation(bluumNftV2Implementation.address);
        expect(await bluumFactory.bluumNftContractImplementation()).to.be.eq(bluumNftV2Implementation.address);
        Log.info("BluumNft contract implementation is upgraded");
    });

    it("Should deploy a new collection", async () => {
        Log.info("Deploying a new collection");
        await bluumFactory.deployCollection(
            "Bluum NFT",
            "BLT",
        )
        const collectionAddress = await bluumFactory.getCollectionAddress(1);
        bluumNftV2 = await ethers.getContractAt("BluumNftV2", collectionAddress) as BluumNftV2;
        await bluumNftV2.deployed();
        Log.info(`New collection is deployed to ${bluumNftV2.address}`);
    });

    it("Should not revert when the new sayHello method is called", async () => {
        expect(await bluumNftV2.sayHello()).to.not.be.reverted;
    }); 
});
