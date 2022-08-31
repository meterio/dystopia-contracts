import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { MinterUpgradeable, VoltVoter } from "../../typechain";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const minterjson = Misc.getContract(await deployer.getChainId(), "Minter");
  const voterJson = Misc.getContract(await deployer.getChainId(), "Voter");
  if (minterjson.address != ethers.constants.AddressZero) {

    let minter = await ethers.getContractAt("MinterUpgradeable", minterjson.address, admin) as MinterUpgradeable;

    let receipt = await minter.updatePeriod();
    console.info(`updatePeriod:`, receipt.hash);

    const voter = await ethers.getContractAt("VoltVoter",voterJson.address, admin) as VoltVoter;
    console.info("find voter:", voterJson.address);
    receipt = await voter.distributeAll();
    console.info(`distributeAll:`, receipt.hash);
    
  } else {
    console.log("No factory address")
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
