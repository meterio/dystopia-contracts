import { Deploy } from "../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { VoltVoterUpgradeable, TransparentUpgradeableProxy } from "../../typechain";
import { Verify } from "../Verify";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const voterJson = Misc.getContract(await deployer.getChainId(), "Voter");
  if (voterJson.address != ethers.constants.AddressZero) {

    let voterImpl = await Deploy.deployContract(deployer, "VoltVoterUpgradeable") as VoltVoterUpgradeable;
    await Verify.sourcify();

    let voterProxy = await ethers.getContractAt("TransparentUpgradeableProxy", voterJson.address, deployer) as TransparentUpgradeableProxy;

    let receipt = await voterProxy.upgradeTo(
      voterImpl.address,
    );
    console.log("upgradeTo:", receipt.hash);

    const data = ''
      + 'update to: ' + voterImpl.address + '\n'

    console.log(data);
    Misc.saveFile(await deployer.getChainId(), "VoterImpl", voterImpl.address);
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
