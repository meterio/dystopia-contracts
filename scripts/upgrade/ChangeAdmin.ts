import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { TransparentUpgradeableProxy } from "../../typechain";
import { Signer } from "ethers";

const newAdmin = "0x175FB9401BB5E360FF3c0Ef00097116944128930";

const changeAdmin = async (name: string, signer: Signer) => {
  const json = Misc.getContract(await signer.getChainId(), name);
  const controllerProxy = await ethers.getContractAt("TransparentUpgradeableProxy", json.address, signer) as TransparentUpgradeableProxy;
  let receipt = await controllerProxy.changeAdmin(newAdmin);
  console.info(`${name} changeAdmin tx:`, receipt.hash);

}

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  await changeAdmin("Controller", deployer);
  await changeAdmin("Ve", deployer);
  await changeAdmin("VeDist", deployer);
  await changeAdmin("Voter", deployer);
  await changeAdmin("Minter", deployer);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
