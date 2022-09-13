import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { Bribe, Gauge, Minter, Ve, VoltFactory, VoltPair, VoltVoter } from "../../typechain";
import { formatEther } from "ethers/lib/utils";

async function main() {
  const [deployer, admin] = await ethers.getSigners();
  const factoryJson = Misc.getContract(await deployer.getChainId(), "Factory");
  const voterJson = Misc.getContract(await deployer.getChainId(), "Voter");
  const minterJson = Misc.getContract(await deployer.getChainId(), "Minter");
  

  if (voterJson.address != ethers.constants.AddressZero && factoryJson.address != ethers.constants.AddressZero) {
    console.info("find voter:", voterJson.address);
    const voter = await ethers.getContractAt("VoltVoter", voterJson.address, admin) as VoltVoter;
    const totalWeight = await voter.totalWeight();
    console.log("totalWeight:",formatEther(totalWeight));
    const minter = await ethers.getContractAt("Minter",minterJson.address,admin) as Minter;
    const weeklyEmission = await minter.weeklyEmission();
    console.log("weeklyEmission:",formatEther(weeklyEmission));

    
    const factory = await ethers.getContractAt("VoltFactory", factoryJson.address, admin) as VoltFactory;
    const allPairsLength = await factory.allPairsLength();
    console.info("allPairsLength:", allPairsLength.toNumber());
    for (let i = 0; i < allPairsLength.toNumber(); i++) {
      
      let pair = await factory.allPairs(i);
      console.info(`pair_${i}:`, pair);
      
      const voteWeight = await voter.weights(pair);
      console.log(`pair_${i}_voteWeight:`,formatEther(voteWeight));
      const apr = voteWeight.mul(weeklyEmission).div(totalWeight);
      console.log("apr:",formatEther(apr));
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
