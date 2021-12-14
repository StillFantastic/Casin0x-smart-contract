// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const resultTimeSeconds = Math.trunc((new Date(Date.UTC(2022,1,1))).getTime() / 1000);
  const deadlineTimeSeconds = Math.trunc((new Date(Date.UTC(2021,12,25,23,59,59))).getTime() / 1000);
  const strike = 6000;
  const Casin0x = await ethers.getContractFactory("Casin0x");
  casin0x = await Casin0x.deploy(deadlineTimeSeconds, resultTimeSeconds, strike);
  await casin0x.deployed();

  console.log("Casin0x deployed to:", casin0x.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
