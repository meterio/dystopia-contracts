import { Deploy } from "../../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { VoltFactory } from "../../../typechain";

const newPauser = "0x5C85A7Ae2B6d29C38cdF360553F8aCBC4e684c31";
const factoryAddress = "0xb33de8c0843f90655ad6249f20b473a627443d21";

// npx hardhat run scripts/setting/VoltFactory/SetPauser.ts --network metermain

async function main() {
  const [deployer, currentAdmin] = await ethers.getSigners();
  let receipt = await deployer.sendTransaction({
    to: currentAdmin.address,
    value: "10000000000000000",
  });
  console.log("send:", receipt.hash);
  await receipt.wait();

  let factory = (await ethers.getContractAt(
    "VoltFactory",
    factoryAddress,
    currentAdmin
  )) as VoltFactory;

  receipt = await factory.setTreasury(newPauser);
  console.log("setTreasury:", receipt.hash);
  receipt = await factory.setPauser(newPauser);
  console.log("setPauser:", receipt.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
