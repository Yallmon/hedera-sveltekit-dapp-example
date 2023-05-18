import { task, types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

interface Args {
  contractAddress: string;
  decrement: boolean;
}

task(
  "simpleCounterContractCall",
  "Call the increment or decrement function on the SimpleCounter contract"
)
  .addParam(
    "contractAddress",
    "The address of the SimpleCounter contract",
    "",
    types.string
  )
  .addFlag("decrement", "Decrement the counter (default is increment)")
  .setAction(async (taskArgs: Args, hre: HardhatRuntimeEnvironment) => {
    const { contractAddress, decrement } = taskArgs;
    const wallet = (await hre.ethers.getSigners())[0];
    const simpleCounterContract = await hre.ethers.getContractAt(
      "SimpleCounter",
      contractAddress,
      wallet
    );
    const tx = await simpleCounterContract[
      decrement ? "decrement" : "increment"
    ]();
    await tx.wait();

    console.log(
      `Calling ${
        decrement ? "decrement" : "increment"
      } on Contract ${contractAddress}`
    );
  });
