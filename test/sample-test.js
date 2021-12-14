const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Casin0x", function () {
  describe("placeBet()", function () {
    var casin0x;
    beforeEach(async () => {
      const now = Math.trunc((new Date()).getTime() / 1000);
      const Casin0x = await ethers.getContractFactory("Casin0x");
      casin0x = await Casin0x.deploy(now + 100, now + 150, 4000);
      await casin0x.deployed();
    });

    it("Should accept bet before deadline", async function () {
      // const now = Math.trunc((new Date()).getTime() / 1000);
      // const Casin0x = await ethers.getContractFactory("Casin0x");
      // const casin0x = await Casin0x.deploy(now + 100, now + 150, 4000);
      // await casin0x.deployed();

      const tx = await casin0x.placeBet(true, {value: ethers.utils.parseEther("0.123")});
      await tx.wait();
      
      const count = await casin0x.getBetCount();
      expect(count).to.equal(1);
      const bet = await casin0x.getBet(0);
      expect(bet.betSize).to.equal(ethers.utils.parseEther("0.123"));
    });

    it("Should revert if time exceed deadline", async function () {
      const now = Math.trunc((new Date()).getTime() / 1000);
      await ethers.provider.send("evm_setNextBlockTimestamp", [now + 120]);

      await expect(casin0x.placeBet(true, {value: ethers.utils.parseEther("0.123")}))
        .to.be.revertedWith("Betting already closed.");
    });
  });
});
