import { Deploy } from "../Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { Verify } from "../../Verify";
import { readFileSync } from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  const chainId = await deployer.getChainId();
  const path = `./scripts/Addresses/${chainId}/`;
  const file = 'WMTR.json';
  const WMTR_TOKEN = JSON.parse(readFileSync(path + file).toString());

  const [factory, router] = await Deploy.deployDex(deployer, WMTR_TOKEN.address);

  const lib = await Deploy.deployLibrary(deployer, router.address)

  const data = ''
    + 'factory: ' + factory.address + '\n'
    + 'router: ' + router.address + '\n'
    + 'SolidlyLibrary: ' + lib.address + '\n'

  console.log(data);
  Misc.saveFile(await deployer.getChainId(), "Factory", factory.address);
  Misc.saveFile(await deployer.getChainId(), "Router", router.address);
  Misc.saveFile(await deployer.getChainId(), "SolidlyLibrary", lib.address);

  await Verify.sourcify();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
