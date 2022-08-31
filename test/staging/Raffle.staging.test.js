const { assert, expect } = require("chai");
const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");
//

developmentChains.includes(network.name)
  ? describe.skip
  : describe(" Raffle Unit Tests ", function() {
      let raffle, raffleEntranceFee, deployer;

      beforeEach(async function() {
        deployer = (await getNamedAccounts()).deployer;
        raffle = await ethers.getContract(" Raffle ", deployer);
        raffleEntranceFee = await raffle.getEntranceFee();
      });
      describe("fufufu", function() {
        it("works live chainlink keepers and chainlink vrf and get a random winner", async function() {
          const startingTimeStamp = await raffle.getLatestTimeStamp();
          const accounts = await ethers.getSigner();

          await new Promise(async (resolve, reject) => {
            raffle.once("WinnerPicked", async () => {
              console.log("WinnerPicked");

              try {
                const recentWinner = await raffle.getRecentWinner();
                const raffleState = await raffle.getRafflestate();
                const winnerBalance = await accounts[0].getBalance();
                const endingTimeStamp = await raffle.getLatestTimeStamp();

                await expect(raffle.getPlayer(0)).to.be.reverted;
                assert.equal(recentWinner.toString(), accounts[0].address);
                assert.equal(rafflestate, 0);
                assert.equal(
                  winnerEndingBalance.toString(),
                  winnerStartingBalance.add(raffleEntranceFee.toString())
                );
                assert(endingTimeStamp > startingTimeStamp);
                resolve();
              } catch (error) {
                console.log(error);
                reject(e);
              }
            });
            await raffle.enterRaffle({ value: raffleEntranceFee });
            const winnerStartingBalance = await accounts[0].getBalance();
          });
        });
      });
    });
