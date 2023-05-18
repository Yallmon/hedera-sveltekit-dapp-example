import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task(
  "showBalance",
  "Show the balance of an account",
  async function (_, hre: HardhatRuntimeEnvironment) {
    const wallet = (await hre.ethers.getSigners())[0];
    const balance = (await wallet.getBalance()).toString();
    console.log(`The address ${wallet.address} has ${balance} tinybars`);
    return balance;
  }
);
