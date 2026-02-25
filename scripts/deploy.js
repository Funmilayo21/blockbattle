const hre = require("hardhat");

async function main() {
  console.log("Deploying BlockBattle contract...");

  const BlockBattle = await hre.ethers.getContractFactory("BlockBattle");
  const blockBattle = await BlockBattle.deploy();

  await blockBattle.waitForDeployment();
  const address = await blockBattle.getAddress();

  console.log("BlockBattle deployed to:", address);

  // Fund the contract with some ETH for rewards
  const fundTx = await blockBattle.fundContract({ value: hre.ethers.parseEther("1.0") });
  await fundTx.wait();
  console.log("Contract funded with 1 ETH for rewards");

  return address;
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = main;
