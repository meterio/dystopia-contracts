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

const WMTR_TOKEN = "0xfAC315d105E5A7fe2174B3EB1f95C257A9A5e271".toLowerCase();
const USDT_TOKEN = "0xda5f90e416a22f6f65ed586a859c8666ce6ce1d1".toLowerCase();
const USDC_TOKEN = "0x8ae4c669f147737085a23d578c1da94d3e39879f".toLowerCase();
const MTRG_TOKEN = "0x8a419ef4941355476cf04933e90bf3bbf2f73814".toLowerCase();
const ETH_TOKEN = "0xe8876830e7cc85dae8ce31b0802313caf856886f".toLowerCase();
const WBTC_TOKEN = "0xcfd9102a2675e0d898982f1fd1dd0264aaa901da".toLowerCase();
const SUUSD_TOKEN = "0x37d982D96AC985a4Fa9522383De5010109F0627C".toLowerCase();
const SUETH_TOKEN = "0x4b0D849E5BF7f62bcBb0B7C364DDDA552c2c3a8a".toLowerCase();
const SUBTC_TOKEN = "0x0477763b021E0f30680b7266a264d1044FE77A4d".toLowerCase();
const SUMER_TOKEN = "0xF67C5F20B95b7604EBB65A53E50ebd38300da8EE".toLowerCase();

const VeDistPerWeek = parseUnits('30000');
const VoterPerWeek = parseUnits('70000');

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const factoryJson = Misc.getContract(await deployer.getChainId(), "Factory");
  const tokenJson = Misc.getContract(await deployer.getChainId(), "Volt");

  if (factoryJson.address != ethers.constants.AddressZero &&
    tokenJson.address != ethers.constants.AddressZero) {

    const controllerImpl = await Deploy.deployContract(deployer, 'ControllerUpgradeable') as ControllerUpgradeable;
    await Verify.verify(controllerImpl.address);
    const controllerProxy = await Deploy.deployContract(deployer, "TransparentUpgradeableProxy",
      controllerImpl.address,
      deployer.address,
      controllerImpl.interface.encodeFunctionData("initialize", [admin.address])
    );
    await Verify.verify(controllerProxy.address);
    const veImpl = await Deploy.deployContract(deployer, "VeUpgradeable") as VeUpgradeable;
    await Verify.verify(veImpl.address);
    const veProxy = await Deploy.deployContract(deployer, "TransparentUpgradeableProxy",
      veImpl.address,
      deployer.address,
      veImpl.interface.encodeFunctionData("initialize", [tokenJson.address, controllerProxy.address])
    );
    await Verify.verify(veProxy.address);
    const gaugesFactory = await Deploy.deployGaugeFactory(deployer);
    await Verify.verify(gaugesFactory.address);
    const bribesFactory = await Deploy.deployBribeFactory(deployer);
    await Verify.verify(bribesFactory.address);

    const veDistImpl = await Deploy.deployContract(deployer, "VeDistUpgradeable") as VeDistUpgradeable;
    await Verify.verify(veDistImpl.address);
    const veDistProxy = await Deploy.deployContract(deployer, "TransparentUpgradeableProxy",
      veDistImpl.address,
      deployer.address,
      veDistImpl.interface.encodeFunctionData("initialize", [veProxy.address, admin.address])
    ) as VeDistUpgradeable;
    await Verify.verify(veDistProxy.address);
    const voterImpl = await Deploy.deployContract(deployer, "VoltVoterUpgradeable") as VoltVoterUpgradeable;
    await Verify.verify(voterImpl.address);
    const voterProxy = await Deploy.deployContract(deployer, "TransparentUpgradeableProxy",
      voterImpl.address,
      deployer.address,
      voterImpl.interface.encodeFunctionData("initialize", [veProxy.address, factoryJson.address, gaugesFactory.address, bribesFactory.address, admin.address])
    );
    await Verify.verify(voterProxy.address);

    const minterImpl = await Deploy.deployContract(deployer, "MinterUpgradeable") as MinterUpgradeable;
    await Verify.verify(minterImpl.address);
    const minterProxy = await Deploy.deployContract(deployer, "TransparentUpgradeableProxy",
      minterImpl.address,
      deployer.address,
      minterImpl.interface.encodeFunctionData("initialize", [veProxy.address, controllerProxy.address, admin.address])
    ) as MinterUpgradeable;
    await Verify.verify(minterProxy.address);


    const data = ''
      + 'controller Impl: ' + controllerImpl.address + '\n'
      + 'controller Proxy: ' + controllerProxy.address + '\n'
      + 'gaugesFactory: ' + gaugesFactory.address + '\n'
      + 'bribesFactory: ' + bribesFactory.address + '\n'
      + 've Impl: ' + veImpl.address + '\n'
      + 've Proxy: ' + veProxy.address + '\n'
      + 'veDist Impl: ' + veDistImpl.address + '\n'
      + 'veDist Proxy: ' + veDistProxy.address + '\n'
      + 'voter Impl: ' + voterImpl.address + '\n'
      + 'voter Proxy: ' + voterProxy.address + '\n'
      + 'minter Impl: ' + minterImpl.address + '\n'
      + 'minter Proxy: ' + minterProxy.address + '\n'

    const vedist = await ethers.getContractAt("VeDist", veDistProxy.address, admin) as VeDist;
    let receipt;
    receipt = await vedist.setDepositor(minterProxy.address);
    console.log('setDepositor:', receipt.hash);
    const controller = await ethers.getContractAt("Controller", controllerProxy.address, admin) as Controller;
    receipt = await controller.setVeDist(veDistProxy.address);
    console.log('setVeDist:', receipt.hash);
    receipt = await controller.setVoter(voterProxy.address);
    console.log('setVoter:', receipt.hash);
    const minter = await ethers.getContractAt("Minter", minterProxy.address, admin) as Minter;
    receipt = await minter.grantRole(ethers.constants.HashZero, voterProxy.address);
    console.log('grantRole:', receipt.hash);
    receipt = await minter.adminSetVeDistPerWeek(VeDistPerWeek);
    console.info(`adminSetVeDistPerWeek:`, receipt.hash);
    receipt = await minter.adminSetVoterPerWeek(VoterPerWeek);
    console.info(`adminSetVoterPerWeek:`, receipt.hash);

    const voterTokens = [
      ETH_TOKEN,
      MTRG_TOKEN,
      SUBTC_TOKEN,
      SUETH_TOKEN,
      SUMER_TOKEN,
      SUUSD_TOKEN,
      USDC_TOKEN,
      USDT_TOKEN,
      WBTC_TOKEN,
      WMTR_TOKEN,
      tokenJson.address
    ]
    const voter = await ethers.getContractAt("VoltVoterUpgradeable", voterProxy.address, admin) as VoltVoterUpgradeable;
    receipt = await voter.init(voterTokens, minterProxy.address);
    console.log('init:', receipt.hash);

    console.log(data);
    Misc.saveFile(await deployer.getChainId(), "ControllerImpl", controllerImpl.address);
    Misc.saveFile(await deployer.getChainId(), "Controller", controllerProxy.address);
    Misc.saveFile(await deployer.getChainId(), "GaugesFactory", gaugesFactory.address);
    Misc.saveFile(await deployer.getChainId(), "BribesFactory", bribesFactory.address);
    Misc.saveFile(await deployer.getChainId(), "VeImpl", veImpl.address);
    Misc.saveFile(await deployer.getChainId(), "Ve", veProxy.address);
    Misc.saveFile(await deployer.getChainId(), "VeDistImpl", veDistImpl.address);
    Misc.saveFile(await deployer.getChainId(), "VeDist", veDistProxy.address);
    Misc.saveFile(await deployer.getChainId(), "VoterImpl", voterImpl.address);
    Misc.saveFile(await deployer.getChainId(), "Voter", voterProxy.address);
    Misc.saveFile(await deployer.getChainId(), "MinterImpl", minterImpl.address);
    Misc.saveFile(await deployer.getChainId(), "Minter", minterProxy.address);

    await Misc.wait(5);
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
