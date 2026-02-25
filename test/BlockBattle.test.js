const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("BlockBattle", function () {
  let blockBattle;
  let owner, addr1, addr2, addr3;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const BlockBattle = await ethers.getContractFactory("BlockBattle");
    blockBattle = await BlockBattle.deploy();
    await blockBattle.waitForDeployment();

    // Fund the contract
    await blockBattle.fundContract({ value: ethers.parseEther("10.0") });
  });

  describe("Meme Submission", function () {
    it("Should submit a meme successfully", async function () {
      await expect(
        blockBattle.connect(addr1).submitMeme("https://example.com/meme1.jpg", "Epic Meme")
      )
        .to.emit(blockBattle, "MemeSubmitted")
        .withArgs(1, addr1.address, "Epic Meme");

      const meme = await blockBattle.getMeme(1);
      expect(meme.creator).to.equal(addr1.address);
      expect(meme.imageUrl).to.equal("https://example.com/meme1.jpg");
      expect(meme.title).to.equal("Epic Meme");
      expect(meme.isActive).to.be.true;
    });

    it("Should fail to submit meme with empty URL", async function () {
      await expect(
        blockBattle.submitMeme("", "Epic Meme")
      ).to.be.revertedWith("Image URL cannot be empty");
    });

    it("Should fail to submit meme with empty title", async function () {
      await expect(
        blockBattle.submitMeme("https://example.com/meme.jpg", "")
      ).to.be.revertedWith("Title cannot be empty");
    });
  });

  describe("Battle Creation", function () {
    beforeEach(async function () {
      await blockBattle.connect(addr1).submitMeme("https://example.com/meme1.jpg", "Meme 1");
      await blockBattle.connect(addr2).submitMeme("https://example.com/meme2.jpg", "Meme 2");
    });

    it("Should create a battle successfully", async function () {
      await expect(blockBattle.createBattle(1, 2))
        .to.emit(blockBattle, "BattleCreated")
        .withArgs(1, 1, 2);

      const battle = await blockBattle.getBattle(1);
      expect(battle.memeId1).to.equal(1);
      expect(battle.memeId2).to.equal(2);
      expect(battle.isActive).to.be.true;
    });

    it("Should fail to create battle with same meme", async function () {
      await expect(
        blockBattle.createBattle(1, 1)
      ).to.be.revertedWith("Cannot battle the same meme");
    });

    it("Should fail to create battle with invalid meme ID", async function () {
      await expect(
        blockBattle.createBattle(1, 999)
      ).to.be.revertedWith("Invalid meme ID 2");
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      await blockBattle.connect(addr1).submitMeme("https://example.com/meme1.jpg", "Meme 1");
      await blockBattle.connect(addr2).submitMeme("https://example.com/meme2.jpg", "Meme 2");
      await blockBattle.createBattle(1, 2);
    });

    it("Should allow voting in active battle", async function () {
      await expect(blockBattle.connect(addr3).vote(1, 1))
        .to.emit(blockBattle, "VoteCast")
        .withArgs(1, 1, addr3.address);

      const meme = await blockBattle.getMeme(1);
      expect(meme.votes).to.equal(1);

      const rewards = await blockBattle.userRewards(addr3.address);
      expect(rewards).to.equal(ethers.parseEther("0.001"));
    });

    it("Should fail to vote twice in same battle", async function () {
      await blockBattle.connect(addr3).vote(1, 1);
      
      await expect(
        blockBattle.connect(addr3).vote(1, 2)
      ).to.be.revertedWith("Already voted in this battle");
    });

    it("Should fail to vote for invalid meme in battle", async function () {
      await blockBattle.connect(addr1).submitMeme("https://example.com/meme3.jpg", "Meme 3");
      
      await expect(
        blockBattle.connect(addr3).vote(1, 3)
      ).to.be.revertedWith("Invalid meme ID for this battle");
    });
  });

  describe("Battle Ending", function () {
    beforeEach(async function () {
      await blockBattle.connect(addr1).submitMeme("https://example.com/meme1.jpg", "Meme 1");
      await blockBattle.connect(addr2).submitMeme("https://example.com/meme2.jpg", "Meme 2");
      await blockBattle.createBattle(1, 2);
    });

    it("Should end battle and determine winner", async function () {
      await blockBattle.connect(addr3).vote(1, 1);
      
      // Fast forward time
      await time.increase(3601); // 1 hour + 1 second

      await expect(blockBattle.endBattle(1))
        .to.emit(blockBattle, "BattleEnded")
        .withArgs(1, 1, addr1.address);

      const battle = await blockBattle.getBattle(1);
      expect(battle.isActive).to.be.false;
      expect(battle.winner).to.equal(addr1.address);

      const loserMeme = await blockBattle.getMeme(2);
      expect(loserMeme.isActive).to.be.false;

      const winnerRewards = await blockBattle.userRewards(addr1.address);
      expect(winnerRewards).to.equal(ethers.parseEther("0.01"));
    });

    it("Should fail to end battle before time ends", async function () {
      await expect(
        blockBattle.endBattle(1)
      ).to.be.revertedWith("Battle has not ended yet");
    });

    it("Should handle tie correctly", async function () {
      // No votes cast, it's a tie
      await time.increase(3601);

      await blockBattle.endBattle(1);

      const meme1 = await blockBattle.getMeme(1);
      const meme2 = await blockBattle.getMeme(2);
      
      // Both memes should remain active in case of tie
      expect(meme1.isActive).to.be.true;
      expect(meme2.isActive).to.be.true;
    });
  });

  describe("Rewards", function () {
    beforeEach(async function () {
      await blockBattle.connect(addr1).submitMeme("https://example.com/meme1.jpg", "Meme 1");
      await blockBattle.connect(addr2).submitMeme("https://example.com/meme2.jpg", "Meme 2");
      await blockBattle.createBattle(1, 2);
      await blockBattle.connect(addr3).vote(1, 1);
    });

    it("Should allow claiming rewards", async function () {
      const initialBalance = await ethers.provider.getBalance(addr3.address);
      const rewards = await blockBattle.userRewards(addr3.address);

      const tx = await blockBattle.connect(addr3).claimRewards();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      const finalBalance = await ethers.provider.getBalance(addr3.address);
      
      expect(finalBalance).to.be.closeTo(
        initialBalance + rewards - gasUsed,
        ethers.parseEther("0.00001") // Small tolerance for gas estimation
      );

      const newRewards = await blockBattle.userRewards(addr3.address);
      expect(newRewards).to.equal(0);
    });

    it("Should fail to claim when no rewards", async function () {
      await expect(
        blockBattle.connect(owner).claimRewards()
      ).to.be.revertedWith("No rewards to claim");
    });
  });

  describe("Active Memes", function () {
    it("Should return all active memes", async function () {
      await blockBattle.connect(addr1).submitMeme("https://example.com/meme1.jpg", "Meme 1");
      await blockBattle.connect(addr2).submitMeme("https://example.com/meme2.jpg", "Meme 2");
      await blockBattle.connect(addr3).submitMeme("https://example.com/meme3.jpg", "Meme 3");

      const activeMemes = await blockBattle.getActiveMemes();
      expect(activeMemes.length).to.equal(3);
      expect(activeMemes[0]).to.equal(1);
      expect(activeMemes[1]).to.equal(2);
      expect(activeMemes[2]).to.equal(3);
    });

    it("Should not return inactive memes", async function () {
      await blockBattle.connect(addr1).submitMeme("https://example.com/meme1.jpg", "Meme 1");
      await blockBattle.connect(addr2).submitMeme("https://example.com/meme2.jpg", "Meme 2");
      await blockBattle.createBattle(1, 2);
      await blockBattle.connect(addr3).vote(1, 1);
      
      await time.increase(3601);
      await blockBattle.endBattle(1);

      const activeMemes = await blockBattle.getActiveMemes();
      expect(activeMemes.length).to.equal(1);
      expect(activeMemes[0]).to.equal(1);
    });
  });
});
