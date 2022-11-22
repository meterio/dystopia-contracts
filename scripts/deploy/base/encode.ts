import { Deploy } from "../Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import {
  Controller,
  ControllerUpgradeable,
  Minter,
  VeUpgradeable,
  VeDist,
  VeDistUpgradeable,
  VoltVoterUpgradeable,
  MinterUpgradeable
} from "../../../typechain";
import { Verify } from "../../Verify";
import { parseUnits } from "ethers/lib/utils";
import { readFileSync } from "fs";
import { constants } from "ethers";


const VeDistPerWeek = parseUnits('30000');
const VoterPerWeek = parseUnits('70000');

async function main() {
  // const [deployer, admin] = await ethers.getSigners();
  const admin = "0x175FB9401BB5E360FF3c0Ef00097116944128930";
  const token = "0xae6f0539e33f624ac685cce9ba57cc1d948d909d";
  const controller = "0xeBC67C9b00970E18E478d3AE0bf55161280A702e";
  const ve = "0x1E462293109cAf2838a7d680f8D3Ab1f87b259f1";
  const factory = "0x8fe77E212e8e605cB7c02E4e917B5f81fE2d1A78";
  const gaugesFactory = "0x9B7A85D509892be751fde731feD56EbFCC74Ce32";
  const bribesFactory = "0x7272eeCc89B7026fDB296Dee6f46770785F4eba6";

  // const controllerImpl = await ethers.getContractAt("ControllerUpgradeable",constants.AddressZero) as ControllerUpgradeable;
  // let code = controllerImpl.interface.encodeFunctionData("initialize", [admin]);

  // const veImpl = await ethers.getContractAt("VeUpgradeable",constants.AddressZero) as VeUpgradeable;
  // let code = veImpl.interface.encodeFunctionData("initialize", [token, controller])


  // const veDistImpl = await ethers.getContractAt("VeDistUpgradeable", constants.AddressZero) as VeDistUpgradeable;
  // let code = veDistImpl.interface.encodeFunctionData("initialize", [ve, admin])

  // const voterImpl = await ethers.getContractAt("VoltVoterUpgradeable",constants.AddressZero) as VoltVoterUpgradeable;
  // let code = voterImpl.interface.encodeFunctionData("initialize", [ve, factory, gaugesFactory, bribesFactory, admin])

  const minterImpl = await ethers.getContractAt( "MinterUpgradeable",constants.AddressZero) as MinterUpgradeable;
  let code = minterImpl.interface.encodeFunctionData("initialize", [ve, controller, admin])

  console.log(code)
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
