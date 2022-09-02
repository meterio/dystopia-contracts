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
  const path = `../../Addresses/${chainId}/`;
  const file = 'Tokens.json';
  const TokenJson = JSON.parse(readFileSync(path + file).toString());

  const factoryJson = Misc.getContract(chainId, "Factory");
  const tokenJson = Misc.getContract(chainId, "Volt");

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

    const voterTokens = TokenJson.push(tokenJson.address);

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
