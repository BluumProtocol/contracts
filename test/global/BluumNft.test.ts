import { ethers } from "hardhat";
import { expect } from "chai";
import { BluumNft, AccessManager, Whitelist } from "../../typechain-types";
import { calculateHash } from "../helpers/chiffrement";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("BluumNft contract global testing", function () {
  let bluumNft: BluumNft;
  let accessManager: AccessManager;
  let whitelist: Whitelist;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addresses: SignerWithAddress[];

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
    [owner, addr1, addr2, ...addresses] = await ethers.getSigners();

    // Deploy and initialize AccessManager contract
    const AccessManager = await ethers.getContractFactory("AccessManager");
    accessManager = (await AccessManager.deploy()) as AccessManager;
    await accessManager.deployed();

    // Deploy and initialize Whitelist contract
    const Whitelist = await ethers.getContractFactory("Whitelist");
    whitelist = (await Whitelist.deploy(accessManager.address)) as Whitelist;
    await whitelist.deployed();

    // Deploy BluumNft contract
    const BluumNft = await ethers.getContractFactory("BluumNft");
    bluumNft = (await BluumNft.deploy()) as BluumNft;
    await bluumNft.deployed();
  });

  describe("Deployment and initialization", function () {
    it("Should not initialize the contract if the access manager is not the zero address", async function () {
      await expect(
        bluumNft.initialize(
          "BluumNFT",
          "BLM",
          ethers.constants.AddressZero,
          whitelist.address
        )
      ).to.be.revertedWithCustomError(bluumNft, "ZeroAddress");
    });

    it("Should not initialize the contract if the whitelist is not the zero address", async function () {
      await expect(
        bluumNft.initialize(
          "BluumNFT",
          "BLM",
          accessManager.address,
          ethers.constants.AddressZero
        )
      ).to.be.revertedWithCustomError(bluumNft, "ZeroAddress");
    });

    it("Should not initialize the contract if the name is null", async function () {
      await expect(
        bluumNft.initialize("", "BLM", accessManager.address, whitelist.address)
      ).to.be.revertedWithCustomError(bluumNft, "NullValue");
    });

    it("Should not initialize the contract if the symbol is null", async function () {
      await expect(
        bluumNft.initialize(
          "BluumNFT",
          "",
          accessManager.address,
          whitelist.address
        )
      ).to.be.revertedWithCustomError(bluumNft, "NullValue");
    });

    it("Should initialize the contract if the parameters are correct", async function () {
      await expect(
        await bluumNft.initialize(
          "BluumNFT",
          "BLM",
          accessManager.address,
          whitelist.address
        )
      ).to.not.be.reverted;
    });

    it("Should set the correct token name and symbol", async function () {
      expect(await bluumNft.name()).to.equal("BluumNFT");
      expect(await bluumNft.symbol()).to.equal("BLM");
    });

    it("Should set the correct access manager and whitelist addresses", async function () {
      expect(await bluumNft.accessManager()).to.equal(accessManager.address);
      expect(await bluumNft.whitelist()).to.equal(whitelist.address);
    });
  });

  describe("Minting", function () {
    it("Should not mint a new token as the caller is not a minter", async function () {
      const mintInputData = {
        to: addresses[0].address,
        publicURI: METADATA.publicURI,
        hashPrivateURI: METADATA.hashPrivateURI,
      };
      await expect(
        bluumNft.connect(addr2).mint(mintInputData)
      ).to.be.revertedWithCustomError(bluumNft, "OnlyMinterCanCall");
      expect(await bluumNft.balanceOf(addresses[0].address)).to.equal(0);
    });

    it("Should mint a new token", async function () {
      const mintInputData = {
        to: addresses[0].address,
        publicURI: METADATA.publicURI,
        hashPrivateURI: METADATA.hashPrivateURI,
      };
      await bluumNft.mint(mintInputData);
      expect(await bluumNft.balanceOf(addresses[0].address)).to.equal(1);
    });

    it("Should return the correct token URI", async function () {
      const tokenURI = await bluumNft.tokenURI(0);
      const tokenURIBase64Decoded = Buffer.from(
        tokenURI.split(",")[1],
        "base64"
      ).toString();
      const tokenURIToJSON = JSON.parse(tokenURIBase64Decoded);
      expect(tokenURIToJSON.name).to.equal("Bluum NFT");
      expect(tokenURIToJSON.description).to.equal("Bluum NFT description");
      expect(tokenURIToJSON.image).to.equal(
        "ipfs://QmT7bt99t3pi1kvrJMBd9349uhJh9WhB5P3qkHu1hvC9pp"
      );
      expect(tokenURIToJSON.attributes[0].trait_type).to.equal("Background");
      expect(tokenURIToJSON.attributes[0].value).to.equal("Bedroom");
      expect(tokenURIToJSON.attributes[1].trait_type).to.equal("Sex");
      expect(tokenURIToJSON.attributes[1].value).to.equal("Woman");
    });

    it("Should not return the URI of a wrong token ID", async function () {
      await expect(bluumNft.tokenURI(10)).to.be.revertedWithCustomError(
        bluumNft,
        "WrongTokenId"
      );
    });

    it("Should not reveal the private URI as the caller is not the owner", async function () {
      await expect(
        bluumNft.revealPrivateURI(0, Buffer.from(PRIVATE_URI, "utf8"))
      ).to.be.revertedWithCustomError(bluumNft, "OnlyTokenOwnerCanCall");
      const tokenURI = await bluumNft.tokenURI(0);
      const tokenURIBase64Decoded = Buffer.from(
        tokenURI.split(",")[1],
        "base64"
      ).toString();
      const tokenURIToJSON = JSON.parse(tokenURIBase64Decoded);
      expect(tokenURIToJSON.image).to.equal(
        "ipfs://QmT7bt99t3pi1kvrJMBd9349uhJh9WhB5P3qkHu1hvC9pp"
      );
    });

    it("Should not reveal the private URI as the hash is wrong", async function () {
      await expect(
        bluumNft
          .connect(addresses[0])
          .revealPrivateURI(0, Buffer.from("QmT7bt99t3pi1kvrJMeeEzeideziodezoedjoffff", "utf8"))
      ).to.be.revertedWithCustomError(bluumNft, "WrongPrivateURI");
      const tokenURI = await bluumNft.tokenURI(0);
      const tokenURIBase64Decoded = Buffer.from(
        tokenURI.split(",")[1],
        "base64"
      ).toString();
      const tokenURIToJSON = JSON.parse(tokenURIBase64Decoded);
      expect(tokenURIToJSON.image).to.equal(
        "ipfs://QmT7bt99t3pi1kvrJMBd9349uhJh9WhB5P3qkHu1hvC9pp"
      );
    });

    it("Should reveal the private URI as the caller is the owner", async function () {
      await expect(
        await bluumNft.connect(addresses[0]).revealPrivateURI(0, Buffer.from(PRIVATE_URI, "utf8"))
      ).to.not.be.reverted;
      const tokenURI = await bluumNft.tokenURI(0);
      const tokenURIBase64Decoded = Buffer.from(
        tokenURI.split(",")[1],
        "base64"
      ).toString();
      const tokenURIToJSON = JSON.parse(tokenURIBase64Decoded);
      expect(tokenURIToJSON.image).to.equal(
        "ipfs://QmdgtLcTPUw2pWqNrXc2yqTrWeL58k8ZmVCTYrHDBZLeQ7"
      );
    });
  });

  describe("Batch minting", function () {
    it("Should mint a batch of new tokens", async function () {
      let addressesToMint = [addr1, addr2];
      const inputData = [];
      for (let i = 0; i < addressesToMint.length; i++) {
        inputData.push({
          to: addressesToMint[i].address,
          publicURI: METADATA.publicURI,
          hashPrivateURI: METADATA.hashPrivateURI,
        });
      }
      await expect(await bluumNft.mintBatch(inputData)).to.not.be.reverted;
      expect(await bluumNft.balanceOf(addr1.address)).to.equal(1);
      expect(await bluumNft.balanceOf(addr2.address)).to.equal(1);
    });
  });

  describe("Whitelist", function () {
    it("Addr1 should be able to mint a new NFT as whitelist is disabled", async function () {
      expect(
        await whitelist.isWhitelisted(addr1.address, bluumNft.address)
      ).to.equal(true);
      await expect(
        await bluumNft.mint(
          {
            to: addr1.address,
            publicURI: METADATA.publicURI,
            hashPrivateURI: METADATA.hashPrivateURI,
          }
        )
      ).to.not.be.reverted;
    });

    it("Should not enable the whitelist as the caller is not the owner", async function () {
      await expect(
        whitelist.connect(addr2).setWhitelistRequired(bluumNft.address, true)
      ).to.be.revertedWithCustomError(whitelist, "OnlyAdminCanCall");
    });

    it("Should enable the  whitelist", async function () {
      await expect(whitelist.setWhitelistRequired(bluumNft.address, true)).to
        .not.be.reverted;
    });

    it("Addr1 should not be able to mint a new NFT as whitelist is enabled", async function () {
      expect(
        await whitelist.isWhitelisted(addr1.address, bluumNft.address)
      ).to.equal(false);
      await expect(
        bluumNft.mint(
          {
            to: addr1.address,
            publicURI: METADATA.publicURI,
            hashPrivateURI: METADATA.hashPrivateURI,
          }
        )
      ).to.be.revertedWithCustomError(bluumNft, "IsNotWhitelisted");
    });

    it("Should not add Addr1 to the whitelist as the caller is not an admin", async function () {
      await expect(
        whitelist
          .connect(addr2)
          .addToWhitelist([addr1.address], bluumNft.address)
      ).to.be.revertedWithCustomError(whitelist, "OnlyAdminCanCall");
      expect(
        await whitelist.isWhitelisted(addr1.address, bluumNft.address)
      ).to.equal(false);
    });

    it("Should add Addr1 to the whitelist", async function () {
      await whitelist.addToWhitelist([addr1.address], bluumNft.address);
      expect(
        await whitelist.isWhitelisted(addr1.address, bluumNft.address)
      ).to.equal(true);
    });

    it("Addr1 should not be able to mint a new NFT as whitelist is enabled", async function () {
      await expect(
        await bluumNft.mint(
          {
            to: addr1.address,
            publicURI: METADATA.publicURI,
            hashPrivateURI: METADATA.hashPrivateURI,
          }
        )
      ).to.not.be.reverted;
    });

    it("Addr2 should not be able to mint a new NFT as whitelist is enabled", async function () {
      expect(
        await whitelist.isWhitelisted(addr2.address, bluumNft.address)
      ).to.equal(false);
      await expect(
        bluumNft.mint(
          {
            to: addr2.address,
            publicURI: METADATA.publicURI,
            hashPrivateURI: METADATA.hashPrivateURI,
          }
        )
      ).to.be.revertedWithCustomError(bluumNft, "IsNotWhitelisted");
    });

    it("Should not remove Addr1 from the whitelist as the caller is not an admin", async function () {
      await expect(
        whitelist
          .connect(addr2)
          .removeFromWhitelist([addr1.address], bluumNft.address)
      ).to.be.revertedWithCustomError(whitelist, "OnlyAdminCanCall");
      expect(
        await whitelist.isWhitelisted(addr1.address, bluumNft.address)
      ).to.equal(true);
    });

    it("Should remove Addr1 from the whitelist", async function () {
      await whitelist.removeFromWhitelist([addr1.address], bluumNft.address);
      expect(
        await whitelist.isWhitelisted(addr1.address, bluumNft.address)
      ).to.equal(false);
    });

    it("Addr1 should not be able to mint a new NFT as whitelist is enabled", async function () {
      // Enable whitelist
      whitelist.setWhitelistRequired(bluumNft.address, true);
      expect(
        await whitelist.isWhitelisted(addr1.address, bluumNft.address)
      ).to.equal(false);
      await expect(
        bluumNft.mint(
          {
            to: addr1.address,
            publicURI: METADATA.publicURI,
            hashPrivateURI: METADATA.hashPrivateURI,
          }
        )
      ).to.be.revertedWithCustomError(bluumNft, "IsNotWhitelisted");
    });
  });
});
