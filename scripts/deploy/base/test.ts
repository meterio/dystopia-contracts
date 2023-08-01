import { Deploy } from "../Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import {
  ControllerUpgradeable__factory,
  VeUpgradeable__factory,
  VeDistUpgradeable__factory,
  VoltVoterUpgradeable__factory,
  MinterUpgradeable__factory,
} from "../../../typechain";
import { Verify } from "../../Verify";
import { parseUnits } from "ethers/lib/utils";
import { readFileSync } from "fs";

const VeDistPerWeek = parseUnits("30000");
const VoterPerWeek = parseUnits("70000");

async function main() {
  const [deployer] = await ethers.getSigners();
  const chainId = await deployer.getChainId();
  const admin = "0xf98993Ea9f8603451d7CA231aEd91657BeD6dF75";
  const volt = "0x863656e346d8A42EC7caAAd606611b6fD8916f32";
  const controllerProxy = "0x8170b318b359d85F1C91970a140D756dcd106713";
  const veProxy = "0x61E2c1608B1caA59136BCB7845637858d216c3B9";
  const factory = "0x2A5478bE24F9E536cCb91DBF650EFD6cE6C00398";
  const gaugesFactory = "0xaE1BB8Aa05BD93b8D918d5C36cb088238FC11060";
  const bribesFactory = "0x2dFa59cE6025FDDFc8A44068380b71570F8f88c8";

  let IController = ControllerUpgradeable__factory.createInterface();
  let data = IController.encodeFunctionData("initialize", [admin]);
  console.log("IControllerinitialize:", data);

  let IVeUpgradeable = VeUpgradeable__factory.createInterface();
  data = IVeUpgradeable.encodeFunctionData("initialize", [
    volt,
    controllerProxy,
  ]);
  console.log("IVeUpgradeable:", data);

  let IVeDistUpgradeable = VeDistUpgradeable__factory.createInterface();
  data = IVeDistUpgradeable.encodeFunctionData("initialize", [veProxy, admin]);
  console.log("IVeDistUpgradeable:", data);

  let IVoltVoterUpgradeable = VoltVoterUpgradeable__factory.createInterface();
  data = IVoltVoterUpgradeable.encodeFunctionData("initialize", [
    veProxy,
    factory,
    gaugesFactory,
    bribesFactory,
    admin,
  ]);
  console.log("IVoltVoterUpgradeable:", data);

  let IMinterUpgradeable = MinterUpgradeable__factory.createInterface();
  data = IMinterUpgradeable.encodeFunctionData("initialize", [
    veProxy,
    controllerProxy,
    admin,
  ]);
  console.log("IMinterUpgradeable:", data);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
