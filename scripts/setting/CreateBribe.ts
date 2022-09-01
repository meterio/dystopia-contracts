import { ethers } from "hardhat";
import { parseUnits } from "ethers/lib/utils";
import { IERC20, Bribe } from "../../typechain";

const MTRG_TOKEN = "0x8a419ef4941355476cf04933e90bf3bbf2f73814";
const bribe = "0x8033e8f2f6a311bd260a32077ac9ab628e9177b0";

async function main() {
  const [deployer, admin] = await ethers.getSigners();


    let token = await ethers.getContractAt("IERC20", MTRG_TOKEN, admin) as IERC20;

    let receipt = await token.approve(bribe,ethers.constants.MaxUint256);
    console.info(`approve:`, receipt.hash);

    const bribeContract = await ethers.getContractAt("Bribe",bribe, admin) as Bribe;
    console.info("find bribe:", bribeContract.address);
    receipt = await bribeContract.notifyRewardAmount(MTRG_TOKEN,parseUnits("1"));
    console.info(`notifyRewardAmount:`, receipt.hash);
    
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
