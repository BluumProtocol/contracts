import { ethers } from "hardhat";
import { expect } from "chai";
import { deployContracts, Log } from "../helpers/core";
import { Dex, ERC20Mock, AccessManager, BluumNft, BluumFactory } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { calculateHash, hexToString } from "../helpers/chiffrement";

describe("Dex", () => {
    let dex: Dex;
    let paymentToken: ERC20Mock;
    let owner: SignerWithAddress;
    let teamWallet: SignerWithAddress;
    let addr2: SignerWithAddress;
    let addrs: SignerWithAddress[];
    let accessManager: AccessManager;
    let nftFactory: BluumFactory;
    let collection: BluumNft;
    let PRICE: any;
    let PRICE_ZERO: any;

    const PUBLIC_URI =
    '{ \
        "description": "Bluum NFT description", \
        "external_url": "https://bluumai.com/", \
        "image": "ipfs://QmT7bt99t3pi1kvrJMBd9349uhJh9WhB5P3qkHu1hvC9pp", \
        "name": "Bluum NFT", \
        "attributes": [ \
            { \
                "trait_type": "Background", \
                "value": "Bedroom" \
            }, \
            { \
                "trait_type": "Sex", \
                "value": "Woman" \
            } \
        ] \
    }';

    const PRIVATE_URI =
    '{ \
        "description": "Bluum NFT description Private URI", \
        "external_url": "https://bluumai.com/", \
        "image": "ipfs://QmdgtLcTPUw2pWqNrXc2yqTrWeL58k8ZmVCTYrHDBZLeQ7", \
        "name": "Bluum NFT Private URI", \
        "attributes": [ \
            { \
                "trait_type": "Background", \
                "value": "Bedroom" \
            }, \
            { \
                "trait_type": "Sex", \
                "value": "Woman" \
            } \
        ] \
    }';

    const METADATA = {
        publicURI: Buffer.from(PUBLIC_URI, "utf8"),
        hashPrivateURI: calculateHash(PRIVATE_URI),
    };

    before(async () => {
        [owner, teamWallet, addr2, ...addrs] = await ethers.getSigners();

        const CONTRACTS = await deployContracts(owner, teamWallet);
        dex = CONTRACTS.dex;
        paymentToken = CONTRACTS.erc20Mock;
        accessManager = CONTRACTS.accessManager;
        nftFactory = CONTRACTS.bluumFactory;

        PRICE = {
            paymentTokens: [paymentToken.address],
            prices: [100],
        };

        PRICE_ZERO = {
            paymentTokens: [paymentToken.address],
            prices: [0],
        };
    
    });

    it("Should deloy a new collection", async () => {
        Log.info("Deploying a new collection");
        await nftFactory.deployCollection(
            "Bluum NFT",
            "BLT",
        )
        const collectionAddress = await nftFactory.getCollectionAddress(0);
        collection = await ethers.getContractAt("BluumNft", collectionAddress) as BluumNft;
        Log.info(`Collection deployed at ${collection.address}`);
    });

    it("should not allow to add collections as the caller is not an admin", async () => {
        Log.info("Adding a new collection");
        await expect(dex.connect(addr2).addCollections([collection.address])).to.be.revertedWithCustomError(dex, "OnlyAdminCanCall");
        Log.info("Collection not added");
    });

    it("should allow to add collections", async () => {
        Log.info("Adding a new collection");
        await expect(dex.addCollections([collection.address])).to.emit(dex, "CollectionAdded").withArgs(collection.address);
        Log.info("Collection added");
    });

    it("should not allow to add payment tokens as the caller is not an admin", async () => {
        Log.info("Adding a new payment token");
        await expect(dex.connect(addr2).addPaymentTokens(collection.address, [paymentToken.address])).to.be.revertedWithCustomError(dex, "OnlyAdminCanCall");
        Log.info("Payment token not added");
    });

    it("Should add a new payment token", async () => {
        Log.info("Adding a new payment token");
        await expect(dex.addPaymentTokens(collection.address, [paymentToken.address])).to.emit(dex, "PaymentTokenAdded").withArgs(collection.address, paymentToken.address);
        const paymentTokens = await dex.getPaymentTokens(collection.address);
        expect(paymentTokens.length).to.equal(1);
        expect(paymentTokens[0]).to.equal(paymentToken.address);
        Log.info("Payment token added");
    });

    it("should not allow to set decimals as the caller is not an admin", async () => {
        Log.info("Setting decimals");
        await expect(dex.connect(addr2).setDecimals([paymentToken.address], [18])).to.be.revertedWithCustomError(dex, "OnlyAdminCanCall");
        Log.info("Decimals not set");
    });

    it("should not allow to set decimals as the number of decimals is not the same as the number of payment tokens", async () => {
        Log.info("Setting decimals");
        await expect(dex.setDecimals([paymentToken.address], [18, 18])).to.be.revertedWithCustomError(dex, "TokensAndDecimalsLengthMismatch");
        Log.info("Decimals not set");
    });

    it("should set the decimals", async () => {
        Log.info("Setting decimals");
        await dex.setDecimals([paymentToken.address], [18]);
        Log.info("Decimals set");
    });

    it("should not allow to set metadata as the caller is not an admin", async () => {
        Log.info("Setting metadata");
        await expect(dex.connect(addr2).setMetadata(collection.address, [0], [METADATA])).to.be.revertedWithCustomError(dex, "OnlyAdminCanCall");
        Log.info("Metadata not set");
    });

    it("should allow to set metadata", async () => {
        Log.info("Setting metadata");
        await expect(await dex.setMetadata(collection.address, [0], [METADATA])).to.not.be.reverted;;
        const result = await dex.getNftsMetadata(collection.address, [0]);
        expect(result[0].hashPrivateURI).to.equal(METADATA.hashPrivateURI);
        const publicURIHex = result[0].publicURI.replace("0x", "");
        const publicURI = hexToString(publicURIHex);
        expect(publicURI).to.equal(PUBLIC_URI);
        Log.info("Metadata set");
    });

    it("should not allow to buy an NFT as the price is not set", async () => {
        Log.info("Setting prices");
        const result = await dex.getPaymentTokenPrice(collection.address, 0, [paymentToken.address]);
        expect(result._prices[0]).to.equal(0);
        Log.info("Prices set");
        Log.info("Buying NFT");
        Log.debug("Price: ", await dex.getPaymentTokenPrice(collection.address, 0, [paymentToken.address]));
        Log.debug("Signer Balance: ", await paymentToken.balanceOf(owner.address));
        await expect(dex.connect(owner).buyNft(paymentToken.address, collection.address, 0))
        .to.be.revertedWithCustomError(dex, "PriceMustBeGreaterThanZero");
        Log.info("NFT not bought");
    });

    it("should not allow to set prices as the caller is not an admin", async () => {
        Log.info("Setting prices");
        await expect(dex.connect(addr2).setPrices(collection.address, [PRICE], [0])).to.be.revertedWithCustomError(dex, "OnlyAdminCanCall");
        Log.info("Prices not set");
    });

    it("should allow to set prices", async () => {
        Log.info("Setting prices");
        await dex.setPrices(collection.address, [PRICE], [0]);
        const result = await dex.getPaymentTokenPrice(collection.address, 0, [paymentToken.address]);
        expect(result._prices[0]).to.equal(100);
        Log.info("Prices set");
    });

    it("should not allow to buy an NFT as the available status is not setted", async () => {
        Log.info("Buying NFT");
        Log.debug("Price: ", await dex.getPaymentTokenPrice(collection.address, 0, [paymentToken.address]));
        Log.debug("Signer Balance: ", await paymentToken.balanceOf(owner.address));
        await expect(dex.connect(owner).buyNft(paymentToken.address, collection.address, 0))
        .to.be.revertedWithCustomError(dex, "TokenNotAvailable");
        Log.info("NFT not bought");
    });

    it("should not allow to set available status as the caller is not an admin", async () => {
        Log.info("Setting available status");
        await expect(dex.connect(addr2).setAvailableStatus(collection.address, [0], [true])).to.be.revertedWithCustomError(dex, "OnlyAdminCanCall");
        Log.info("Available status not set");
    });

    it("should allow to set available status", async () => {
        Log.info("Setting available status");
        await expect(await dex.setAvailableStatus(collection.address, [0], [true])).to.not.be.reverted;
        const result = await dex.getAvailableStatus(collection.address, [0]);
        expect(result[0]).to.equal(true);
        Log.info("Available status set");
    });

    it("should allow to buy an NFT", async () => {
        Log.info("Buying NFT");
        Log.debug("Price: ", await dex.getPaymentTokenPrice(collection.address, 0, [paymentToken.address]));
        Log.debug("Signer Balance: ", await paymentToken.balanceOf(owner.address));
        Log.info("Approving payment token");
        await paymentToken.connect(owner).approve(dex.address, ethers.utils.parseEther("100"));
        Log.info("Payment token approved");
        await expect(dex.connect(owner).buyNft(paymentToken.address, collection.address, 0))
            .to.emit(dex, "NftBought")
            .withArgs(collection.address, 0, 0, paymentToken.address, ethers.utils.parseEther("100"), owner.address);
        Log.info("NFT bought");
    });

    it("should not allow to buy an NFT already bought", async () => {
        Log.info("Buying NFT");
        Log.debug("Price: ", await dex.getPaymentTokenPrice(collection.address, 0, [paymentToken.address]));
        Log.debug("Signer Balance: ", await paymentToken.balanceOf(owner.address));
        Log.info("Approving payment token");
        await paymentToken.connect(owner).approve(dex.address, ethers.utils.parseEther("100"));
        Log.info("Payment token approved");
        await expect(dex.connect(owner).buyNft(paymentToken.address, collection.address, 0))
            .to.be.revertedWithCustomError(dex, "TokenNotAvailable");
        Log.info("NFT not bought");
    });

    it("should not allow to remove a payment token as the caller is not an admin", async () => {
        Log.info("Removing a payment token");
        await expect(dex.connect(addr2).removePaymentTokens(collection.address, [paymentToken.address])).to.be.revertedWithCustomError(dex, "OnlyAdminCanCall");
        Log.info("Payment token not removed");
    });

    it("should remove a payment token", async () => {
        Log.info("Removing a payment token");
        await expect(dex.removePaymentTokens(collection.address, [paymentToken.address])).to.emit(dex, "PaymentTokenRemoved").withArgs(collection.address, paymentToken.address);
        Log.info("Payment token removed");
    });

    it("should not allow to buy an NFT with a removed payment token", async () => {
        Log.info("Buying NFT");
        Log.debug("Price: ", await dex.getPaymentTokenPrice(collection.address, 0, [paymentToken.address]));
        Log.debug("Signer Balance: ", await paymentToken.balanceOf(owner.address));
        Log.info("Approving payment token");
        await paymentToken.connect(owner).approve(dex.address, ethers.utils.parseEther("100"));
        Log.info("Payment token approved");
        await expect(dex.connect(owner).buyNft(paymentToken.address, collection.address, 2))
            .to.be.revertedWithCustomError(dex, "PaymentTokenNotAvailable");
        Log.info("NFT not bought");
    });

    it("Should add a new payment token", async () => {
        Log.info("Adding a new payment token");
        await expect(dex.addPaymentTokens(collection.address, [paymentToken.address])).to.emit(dex, "PaymentTokenAdded").withArgs(collection.address, paymentToken.address);
        Log.info("Payment token added");
    });

    it("should not allow to remove a collection as the caller is not an admin", async () => {
        Log.info("Removing a collection");
        await expect(dex.connect(addr2).removeCollections([collection.address])).to.be.revertedWithCustomError(dex, "OnlyAdminCanCall");
        Log.info("Collection not removed");
    });

    it("should remove a collection", async () => {
        Log.info("Removing a collection");
        await expect(dex.removeCollections([collection.address])).to.emit(dex, "CollectionRemoved").withArgs(collection.address);
        Log.info("Collection removed");
    });

    it("should not allow to buy an NFT from a removed collection", async () => {
        Log.info("Buying NFT");
        Log.debug("Price: ", await dex.getPaymentTokenPrice(collection.address, 0, [paymentToken.address]));
        Log.debug("Signer Balance: ", await paymentToken.balanceOf(owner.address));
        Log.info("Approving payment token");
        await paymentToken.connect(owner).approve(dex.address, ethers.utils.parseEther("100"));
        Log.info("Payment token approved");
        await expect(dex.connect(owner).buyNft(paymentToken.address, collection.address, 0))
            .to.be.revertedWithCustomError(dex, "CollectionNotAvailable");
        Log.info("NFT not bought");
    }); 
});
