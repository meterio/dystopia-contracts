import { Deploy } from "../Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { Verify } from "../../Verify";

const WMTR_TOKEN = '0xfAC315d105E5A7fe2174B3EB1f95C257A9A5e271';

async function main() {
  const [deployer] = await ethers.getSigners();

  const [factory, router] = await Deploy.deployDex(deployer, WMTR_TOKEN);

  const lib = await Deploy.deployLibrary(deployer, router.address)

  const data = ''
    + 'factory: ' + factory.address + '\n'
    + 'router: ' + router.address + '\n'
    + 'SolidlyLibrary: ' + lib.address + '\n'

  console.log(data);
  Misc.saveFile(await deployer.getChainId(), "Factory", factory.address);
  Misc.saveFile(await deployer.getChainId(), "Router", router.address);
  Misc.saveFile(await deployer.getChainId(), "SolidlyLibrary", lib.address);

  await Verify.verify(factory.address);
  await Verify.verify(router.address);
  await Verify.verify(lib.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
