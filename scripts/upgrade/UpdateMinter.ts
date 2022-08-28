import { Deploy } from "../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { MinterUpgradeable, TransparentUpgradeableProxy } from "../../typechain";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const minterjson = Misc.getContract(await deployer.getChainId(), "Minter");
  if (minterjson.address != ethers.constants.AddressZero) {

    let minterImpl = await Deploy.deployContract(deployer, "MinterUpgradeable") as MinterUpgradeable;

    let minterProxy = await ethers.getContractAt("TransparentUpgradeableProxy", minterjson.address, deployer) as TransparentUpgradeableProxy;

    let receipt = await minterProxy.upgradeTo(
      minterImpl.address,
    );

    let minter = await ethers.getContractAt("MinterUpgradeable", minterProxy.address, admin) as MinterUpgradeable;

    receipt = await minter.setActiveperiod(0);
    console.info(`setActiveperiod:`, receipt.hash);

    const data = ''
      + 'update to: ' + minterImpl.address + '\n'

    console.log(data);
    Misc.saveFile(await deployer.getChainId(), "MinterImpl", minterImpl.address);
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
