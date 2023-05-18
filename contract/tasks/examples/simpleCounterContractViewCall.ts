import { task, types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

interface Args {
  contractAddress: string;
}

task(
  "simpleCounterContractViewCall",
  "Get the counter value from the SimpleCounter contract"
)
  .addParam(
    "contractAddress",
    "The address of the SimpleCounter contract",
    "",
    types.string
  )
  .setAction(async (taskArgs: Args, hre: HardhatRuntimeEnvironment) => {
    const { contractAddress } = taskArgs;
    const wallet = (await hre.ethers.getSigners())[0];
    const simpleCounterContract = await hre.ethers.getContractAt(
      "SimpleCounter",
      contractAddress,
      wallet
    );
    const count = await simpleCounterContract.get();

    console.log(`Count: ${count} on Contract ${contractAddress}`);
  });
