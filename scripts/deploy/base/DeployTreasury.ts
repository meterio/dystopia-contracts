import { Deploy } from "../Deploy";
import { ethers } from "hardhat";
import { Verify } from "../../Verify";
import { Misc } from "../../Misc";
import { GovernanceTreasury } from "../../../typechain";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const treasury = await Deploy.deployContract(admin, "GovernanceTreasury") as GovernanceTreasury;

  await Verify.verify(treasury.address);

  const data = ''
    + 'GovernanceTreasury: ' + treasury.address + '\n'

  console.log(data);
  Misc.saveFile(await deployer.getChainId(), "GovernanceTreasury", treasury.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
