import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { VoltFactory, VoltVoter, Ve, Gauge, Bribe, VoltPair } from "../../typechain";
import { readFileSync } from "fs";


async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const factoryJson = Misc.getContract(await deployer.getChainId(), "Factory");
  const voterJson = Misc.getContract(await deployer.getChainId(), "Voter");

  if (voterJson.address != ethers.constants.AddressZero && factoryJson.address != ethers.constants.AddressZero) {
    console.info("find factory:", factoryJson.address);
    const factory = await ethers.getContractAt("VoltFactory", factoryJson.address, admin) as VoltFactory;
    const allPairsLength = await factory.allPairsLength();
    console.info("allPairsLength:", allPairsLength.toNumber());
    const voter = await ethers.getContractAt("VoltVoter",voterJson.address,admin) as VoltVoter;
    for (let i = 0; i < allPairsLength.toNumber(); i++) {
      let pair = await factory.allPairs(i);
      console.info(`pair_${i}:`, pair);
      let pairInstant = await ethers.getContractAt("VoltPair",pair) as VoltPair;
      let pairFee = await pairInstant.fees();
      console.info(`pairFees_${i}:`, pairFee);
      const gauge = await voter.gauges(pair);
      const bribe = await voter.bribes(gauge);
      console.info(`gauge_${i}:`, gauge);
      console.info(`bribe_${i}:`, bribe);
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
