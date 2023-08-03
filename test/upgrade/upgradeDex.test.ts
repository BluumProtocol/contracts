import { ethers, upgrades } from "hardhat";
import { expect } from "chai";
import { deployContracts, Log } from "../helpers/core";
import { BluumFactory, DexV2__factory, DexV2 } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Upgrade BluumNft", () => {

    let owner: SignerWithAddress;
    let teamWallet: SignerWithAddress;
    let addrs: SignerWithAddress[];
    let dex: DexV2;
    let bluumFactory: BluumFactory;

    before(async () => {
        [owner, teamWallet, ...addrs] = await ethers.getSigners();
        const CONTRACTS = await deployContracts(owner, teamWallet);
        bluumFactory = CONTRACTS.bluumFactory;
        dex = await ethers.getContractAt("DexV2", CONTRACTS.dex.address) as DexV2;
    });

    it("Should revert when the sayHello method is called as the contract implementation is not yet upgraded", async () => {
        await expect(dex.sayHello()).to.be.reverted;
    }); 

    it("Should not upgrade the Dex contract as the caller is not the owner", async () => {
        Log.info("Upgrading the Dex contract");
        let DexV2Factory: DexV2__factory = await ethers.getContractFactory("DexV2", addrs[1]);
        await expect(upgrades.upgradeProxy(dex, DexV2Factory, { kind: "uups" })).to.be.reverted;
        Log.info("Dex contract is not upgraded");
    });

    it("Should upgrade the Dex contract", async () => {
        Log.info("Upgrading the Dex contract");
        let DexV2Factory: DexV2__factory = await ethers.getContractFactory("DexV2", owner);
        await expect(dex = await upgrades.upgradeProxy(dex, DexV2Factory, { kind: "uups" }) as DexV2).to.not.be.reverted;
        Log.info("Dex contract is upgraded");
    });

    it("Should not revert when the new sayHello method is called", async () => {
        expect(await dex.sayHello()).to.not.be.reverted;
    }); 
});
