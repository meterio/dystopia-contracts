import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { VoltFactory, VoltVoter, Ve, Gauge, Bribe } from "../../typechain";
import { readFileSync } from "fs";

const TokenId = "1";

async function main() {
  const [deployer, admin] = await ethers.getSigners();
  const chainId = await deployer.getChainId();
  const path = `../../Addresses/${chainId}/`;
  const file = 'MTRG.json';
  const MTRG_TOKEN = JSON.parse(readFileSync(path + file).toString());
  const factoryJson = Misc.getContract(await deployer.getChainId(), "Factory");
  const voterJson = Misc.getContract(await deployer.getChainId(), "Voter");

  if (voterJson.address != ethers.constants.AddressZero && factoryJson.address != ethers.constants.AddressZero) {
    console.info("find voter:", voterJson.address);
    const voter = await ethers.getContractAt("VoltVoter", voterJson.address, admin) as VoltVoter;
    console.info("find factory:", factoryJson.address);
    const ve = await ethers.getContractAt("Ve", await voter.ve(), admin) as Ve;

    console.info("ListingFee:", (await voter.listingFee()).toString());
    console.info("balanceOfNFT:", (await ve.balanceOfNFT(TokenId)).toString());

    const factory = await ethers.getContractAt("VoltFactory", factoryJson.address, admin) as VoltFactory;
    const allPairsLength = await factory.allPairsLength();
    console.info("allPairsLength:", allPairsLength.toNumber());
    for (let i = 0; i < allPairsLength.toNumber(); i++) {
      let pair = await factory.allPairs(i);
      console.info(`pair_${i}:`, pair);

      let gauge = await voter.gauges(pair);
      console.info(`gauge_${i}:`, gauge);
      if (gauge != ethers.constants.AddressZero) {
        let gaugeContract = await ethers.getContractAt("Gauge", gauge, admin) as Gauge;
        if (await gaugeContract.isRewardToken(MTRG_TOKEN.address) == false) {
          let receipt = await voter.registerRewardToken(MTRG_TOKEN.address, gauge, TokenId);
          console.info(`gauge_${i} register reward token:`, receipt.hash);
        }
      }

      let bribe = await voter.bribes(gauge);
      console.info(`bribe_${i}:`, bribe);
      if (gauge != ethers.constants.AddressZero) {
        let bribeContract = await ethers.getContractAt("Bribe", bribe, admin) as Bribe;
        if (await bribeContract.isRewardToken(MTRG_TOKEN.address) == false) {
          let receipt = await voter.registerRewardToken(MTRG_TOKEN.address, bribe, TokenId);
          console.info(`gauge_${i} register reward token:`, receipt.hash);
        }
      }
    }
  } else {
    console.log("No voter address")
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
