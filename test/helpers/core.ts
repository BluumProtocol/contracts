import { ethers, upgrades } from "hardhat";
import { Logger, ILogObj } from "tslog";
import { Whitelist, AccessManager, AccessManager__factory, ERC20Mock, BluumNft, BluumFactory, Dex, Whitelist__factory, BluumFactory__factory, BluumNft__factory, Dex__factory, ERC20Mock__factory } from "../../typechain-types";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { assert } from "console";

// Initialize logger
export const Log: Logger<ILogObj> = new Logger();

// Function to deploy contracts
export async function deployContracts(
    signer: SignerWithAddress,
    teamWallet: SignerWithAddress,
): Promise<{
    accessManager: AccessManager,
    whitelist: Whitelist,
    bluumFactory: BluumFactory,
    dex: Dex,
    erc20Mock: ERC20Mock
}> {
    // Deploy AccessManager contract
    Log.info("Deploying AccessManager contract...");
    const AccessManagerFactory: AccessManager__factory = await ethers.getContractFactory("AccessManager");
    const accessManager: AccessManager = await AccessManagerFactory.connect(signer).deploy();
    await accessManager.deployed();
    Log.info(`AccessManager contract has been deployed to: ${accessManager.address}`);

    // Grant roles to owner
    Log.info("Granting roles to owner...");
    await accessManager.grantRole(await accessManager.DEFAULT_ADMIN_ROLE(), signer.address);
    await accessManager.grantRole(await accessManager.ADMIN_ROLE(), signer.address);
    await accessManager.grantRole(await accessManager.MINTER_ROLE(), signer.address);
    assert(await accessManager.hasRole(await accessManager.DEFAULT_ADMIN_ROLE(), signer.address));
    assert(await accessManager.hasRole(await accessManager.ADMIN_ROLE(), signer.address));
    assert(await accessManager.hasRole(await accessManager.MINTER_ROLE(), signer.address));
    Log.info("Roles have been granted to owner");

    // Deploy Whitelist contract
    Log.info("Deploying Whitelist contract...");
    const WhitelistFactory: Whitelist__factory = await ethers.getContractFactory("Whitelist");
    const whitelist: Whitelist = await WhitelistFactory.connect(signer).deploy(accessManager.address);
    await whitelist.deployed();
    Log.info(`Whitelist contract has been deployed to: ${whitelist.address}`);

    // Deploy BluumNft contract implementation
    Log.info("Deploying BluumNft contract...");
    const BluumNftFactory: BluumNft__factory = await ethers.getContractFactory("BluumNft");
    const bluumNft: BluumNft = await BluumNftFactory.connect(signer).deploy();
    await bluumNft.deployed();
    Log.info(`BluumNft contract has been deployed to: ${bluumNft.address}`);

    // Deploy Bluum Factory contract
    Log.info("Deploying BluumFactory contract...");
    const BluumFactoryFactory: BluumFactory__factory = await ethers.getContractFactory("BluumFactory");
    const bluumFactory: BluumFactory = await BluumFactoryFactory.connect(signer).deploy(
        bluumNft.address,
        accessManager.address,
        whitelist.address
    );
    await bluumFactory.deployed();
    Log.info(`BluumFactory contract has been deployed to: ${bluumFactory.address}`);

    // Deploy Dex contract implementation
    Log.info("Deploying Dex contract implementation...");
    const DexFactory = await ethers.getContractFactory("Dex", signer);
    Log.info("Team wallet address: " + teamWallet.address);
    Log.info("Access manager address: " + accessManager.address);
    const dex = (await upgrades.deployProxy(DexFactory, [teamWallet.address, accessManager.address], { kind: "uups" })) as Dex;
    await dex.deployed();
    Log.info(`Dex proxy has been deployed to: ${dex.address}`);
    Log.info("Granting MINTER_ROLE to Dex...")
    await accessManager.grantRole(await accessManager.MINTER_ROLE(), dex.address);
    assert(await accessManager.hasRole(await accessManager.MINTER_ROLE(), dex.address));
    Log.info("MINTER_ROLE has been granted to Dex");

    // Deploy ERC20Mock contract
    Log.info("Deploying ERC20Mock contract...");
    const ERC20MockFactory: ERC20Mock__factory = await ethers.getContractFactory("ERC20Mock");
    const erc20Mock: ERC20Mock = await ERC20MockFactory.connect(signer).deploy(
        "Mock Token",
        "MTK",
        signer.address,
        BigNumber.from(ethers.utils.parseEther("100000000"))
    );
    await erc20Mock.deployed();
    Log.info(`ERC20Mock contract has been deployed to: ${erc20Mock.address}`);

    return {
        accessManager,
        whitelist,
        bluumFactory,
        dex, 
        erc20Mock
    }
}

