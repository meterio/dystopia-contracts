import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { VoltVoter } from "../../typechain";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const voterJson = Misc.getContract(await deployer.getChainId(), "Voter");
  if (voterJson.address != ethers.constants.AddressZero) {
    const voter = await ethers.getContractAt("VoltVoter",voterJson.address, admin) as VoltVoter;
    console.info("find voter:", voterJson.address);
    let receipt = await voter.distributeAll();
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
