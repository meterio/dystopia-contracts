import { config as dotEnvConfig } from "dotenv";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import "hardhat-etherscan-abi";
import "solidity-coverage";
import "hardhat-deploy";
import { task, types } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();

  for (const account of accounts) {
    let address = await account.getAddress();
    console.log(
      address,
      (await bre.ethers.provider.getBalance(address)).toString()
    );
  }
});

dotEnvConfig();
// tslint:disable-next-line:no-var-requires
const argv = require("yargs/yargs")()
  .env("")
  .options({
    hardhatChainId: {
      type: "number",
      default: 31337,
    },
    ganacheRpc: {
      type: "string",
      default: "http://127.0.0.1:7545",
    },
    maticRpcUrl: {
      type: "string",
      default: "",
    },
    mumbaiRpcUrl: {
      type: "string",
      default: "https://matic-mumbai.chainstacklabs.com",
    },
    ethRpcUrl: {
      type: "string",
      default: "",
    },
    ftmRpcUrl: {
      type: "string",
      default: "",
    },
    meterTestRpcUrl: {
      type: "string",
      default: "https://rpctest.meter.io",
    },
    meterMainRpcUrl: {
      type: "string",
      default: "https://rpc.meter.io",
    },
    networkScanKey: {
      type: "string",
      default: "",
    },
    privateKey: {
      type: "string",
      default:
        "b55c9fcc2c60993e5c539f37ffd27d2058e7f77014823b461323db5eba817518", // random account
    },
    maticForkBlock: {
      type: "number",
    },
    mumbaiForkBlock: {
      type: "number",
    },
    ftmForkBlock: {
      type: "number",
    },
  }).argv;

export default {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: !!argv.hardhatChainId ? argv.hardhatChainId : undefined,
      timeout: 99999 * 2,
      gas:
        argv.hardhatChainId === 137
          ? 19_000_000
          : argv.hardhatChainId === 80001
          ? 19_000_000
          : undefined,
      forking:
        !!argv.hardhatChainId && argv.hardhatChainId !== 31337
          ? {
              url:
                argv.hardhatChainId === 137
                  ? argv.maticRpcUrl
                  : argv.hardhatChainId === 250
                  ? argv.ftmRpcUrl
                  : argv.hardhatChainId === 80001
                  ? argv.mumbaiRpcUrl
                  : undefined,
              blockNumber:
                argv.hardhatChainId === 137
                  ? argv.maticForkBlock !== 0
                    ? argv.maticForkBlock
                    : undefined
                  : argv.hardhatChainId === 250
                  ? argv.ftmForkBlock !== 0
                    ? argv.ftmForkBlock
                    : undefined
                  : argv.hardhatChainId === 80001
                  ? argv.mumbaiForkBlock !== 0
                    ? argv.mumbaiForkBlock
                    : undefined
                  : undefined,
            }
          : undefined,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        accountsBalance: "100000000000000000000000000000",
      },
    },
    matic: {
      url: argv.maticRpcUrl,
      timeout: 99999,
      chainId: 137,
      // gas: 19_000_000,
      // gasPrice: 100_000_000_000,
      gasMultiplier: 1.3,
      accounts: [argv.privateKey],
    },
    mumbai: {
      url: argv.mumbaiRpcUrl,
      chainId: 80001,
      timeout: 99999,
      // gasPrice: 100_000_000_000,
      accounts: [argv.privateKey],
    },
    ftm: {
      url: argv.ftmRpcUrl,
      chainId: 250,
      timeout: 99999,
      accounts: [argv.privateKey],
    },
    metertest: {
      url: argv.meterTestRpcUrl,
      chainId: 83,
      timeout: 99999,
      gasPrice: 500000000000,
      accounts: [process.env.PRIVATE_KEY_0, process.env.PRIVATE_KEY_1],
    },
    metermain: {
      url: argv.meterMainRpcUrl,
      chainId: 82,
      timeout: 99999,
      gasPrice: 500000000000,
      accounts: [process.env.PRIVATE_KEY_0, process.env.PRIVATE_KEY_1],
    },
    theta: {
      url: "https://explorer.thetatoken.org",
      chainId: 361,
      accounts: [process.env.PRIVATE_KEY_0],
    },
    ganache: {
      url: argv.ganacheRpc,
      chainId: 1337,
      accounts: [
        process.env.PRIVATE_KEY_0,
        "0x34cd0e9ec7a0ec36a37db424f720de58223f9cd52e0175c7a972a6a864eb86a5",
      ],
    },
  },
  etherscan: {
    apiKey: argv.networkScanKey,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 9999999999,
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    gasPrice: 21,
  },
  typechain: {
    outDir: "typechain",
  },
};
