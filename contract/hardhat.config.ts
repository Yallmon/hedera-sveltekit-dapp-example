import * as dotenv from "dotenv";
dotenv.config();
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/config";
import "hardhat-abi-exporter";
import "./tasks/examples/showBalance";
import "./tasks/examples/simpleCounterContractCall";
import "./tasks/examples/simpleCounterContractViewCall";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "localnet",
  networks: {
    localnet: {
      url: process.env.LOCALNET_ENDPOINT,
      accounts: [process.env.LOCALNET_OPERATOR_PRIVATE_KEY || ""],
    },
    testnet: {
      url: process.env.TESTNET_ENDPOINT,
      accounts: [process.env.TESTNET_OPERATOR_PRIVATE_KEY || ""],
    },
    previewnet: {
      url: process.env.PREVIEWNET_ENDPOINT,
      accounts: [process.env.PREVIEWNET_OPERATOR_PRIVATE_KEY || ""],
    },
    mainnet: {
      url: process.env.MAINNET_ENDPOINT,
      accounts: [process.env.MAINNET_OPERATOR_PRIVATE_KEY || ""],
    },
  },
  abiExporter: {
    path: "../frontend/src/lib/contracts",
    runOnCompile: true,
    flat: true,
    clear: true,
    spacing: 2,
    pretty: true,
  },
};

export default config;
