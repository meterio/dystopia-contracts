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


const VeDistPerWeek = parseUnits('30000');
const VoterPerWeek = parseUnits('70000');

async function main() {
  const [deployer, admin] = await ethers.getSigners();
  const chainId = await deployer.getChainId();

  const factoryJson = Misc.getContract(chainId, "Factory");
  const volt = Misc.getContract(chainId, "Volt");

  if (factoryJson.address != ethers.constants.AddressZero &&
    volt.address != ethers.constants.AddressZero) {

    const controllerImpl = await Deploy.deployContract(deployer, 'ControllerUpgradeable') as ControllerUpgradeable;
    const controllerProxy = await Deploy.deployContract(deployer, "contracts/proxy/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy",
      controllerImpl.address,
      deployer.address,
      controllerImpl.interface.encodeFunctionData("initialize", [admin.address])
    );
    const veImpl = await Deploy.deployContract(deployer, "VeUpgradeable") as VeUpgradeable;
    const veProxy = await Deploy.deployContract(deployer, "contracts/proxy/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy",
      veImpl.address,
      deployer.address,
      veImpl.interface.encodeFunctionData("initialize", [volt.address, controllerProxy.address])
    );
    const gaugesFactory = await Deploy.deployGaugeFactory(deployer);
    const bribesFactory = await Deploy.deployBribeFactory(deployer);

    const veDistImpl = await Deploy.deployContract(deployer, "VeDistUpgradeable") as VeDistUpgradeable;
    const veDistProxy = await Deploy.deployContract(deployer, "contracts/proxy/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy",
      veDistImpl.address,
      deployer.address,
      veDistImpl.interface.encodeFunctionData("initialize", [veProxy.address, admin.address])
    ) as VeDistUpgradeable;
    
    const voterImpl = await Deploy.deployContract(deployer, "VoltVoterUpgradeable") as VoltVoterUpgradeable;
    const voterProxy = await Deploy.deployContract(deployer, "contracts/proxy/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy",
      voterImpl.address,
      deployer.address,
      voterImpl.interface.encodeFunctionData("initialize", [veProxy.address, factoryJson.address, gaugesFactory.address, bribesFactory.address, admin.address])
    );

    const minterImpl = await Deploy.deployContract(deployer, "MinterUpgradeable") as MinterUpgradeable;
    const minterProxy = await Deploy.deployContract(deployer, "contracts/proxy/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy",
      minterImpl.address,
      deployer.address,
      minterImpl.interface.encodeFunctionData("initialize", [veProxy.address, controllerProxy.address, admin.address])
    ) as MinterUpgradeable;


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

    // TokenJson.push(volt.address);

    const voter = await ethers.getContractAt("VoltVoterUpgradeable", voterProxy.address, admin) as VoltVoterUpgradeable;
    receipt = await voter.init([volt.address], minterProxy.address);
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
    await Verify.sourcify();
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
