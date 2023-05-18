import { ethers } from "hardhat";

async function main() {
  const SimpleCounter = await ethers.getContractFactory("SimpleCounter");
  const simpleCounter = await SimpleCounter.deploy();
  await simpleCounter.deployed();
  console.log(`SimpleCounter deployed to: ${simpleCounter.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
