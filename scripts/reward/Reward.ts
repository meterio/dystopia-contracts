import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { Bribe, Gauge, Ve, VoltFactory, VoltPair, VoltVoter } from "../../typechain";
import { formatEther } from "ethers/lib/utils";

async function main() {
  const [deployer, admin] = await ethers.getSigners();
  const user = '0x8cafd0397e1b09199A1B1239030Cc6b011AE696d';
  const factoryJson = Misc.getContract(await deployer.getChainId(), "Factory");
  const voterJson = Misc.getContract(await deployer.getChainId(), "Voter");
  type Earned = {
    tokenA: string;
    tokenB: string;
    volt: string;
  }
  type Result = {
    tokenA: string;
    tokenB: string;
    position: string;
    stake: string;
    gauge: Earned;
    bribe: Earned;
  }
  let results: Result[] = [];

  if (voterJson.address != ethers.constants.AddressZero && factoryJson.address != ethers.constants.AddressZero) {
    console.info("find voter:", voterJson.address);
    const voter = await ethers.getContractAt("VoltVoter", voterJson.address, admin) as VoltVoter;
    const ve = await ethers.getContractAt("Ve", await voter.ve(), admin) as Ve;
    const volt = await ve.token();
    console.info("find volt:", volt);
    console.info("find factory:", factoryJson.address);
    const tokenId = await ve.tokenOfOwnerByIndex(user,0);
    console.info("tokenId:", tokenId.toNumber());
    const factory = await ethers.getContractAt("VoltFactory", factoryJson.address, admin) as VoltFactory;
    const allPairsLength = await factory.allPairsLength();
    console.info("allPairsLength:", allPairsLength.toNumber());
    for (let i = 0; i < allPairsLength.toNumber(); i++) {
      let result: Result;
      let pair = await factory.allPairs(i);
      console.info(`pair_${i}:`, pair);
      let pairContract = await ethers.getContractAt("VoltPair", pair, admin) as VoltPair;
      let metadata = await pairContract.metadata();
      let tokenA = metadata.t0;
      let tokenB = metadata.t1;
      let gauge = await voter.gauges(pair);
      console.info(`gauge_${i}:`, gauge);
      let gaugeContract = await ethers.getContractAt("Gauge", gauge, admin) as Gauge;
      let gaugeTotalSupply = await gaugeContract.totalSupply();
      console.info(`Gauge totalSupply ${i}:`, formatEther(gaugeTotalSupply));

      let bribe = await voter.bribes(gauge);
      console.info(`bribe_${i}:`, bribe);
      let bribeContract = await ethers.getContractAt("Bribe", bribe, admin) as Bribe;
      let bribeAddress = await bribeContract.tokenIdToAddress(tokenId);
      result = {
        tokenA: tokenA,
        tokenB: tokenB,
        position: formatEther(await pairContract.balanceOf(user)),
        stake: formatEther(await gaugeContract.balanceOf(user)),
        gauge: {
          tokenA: formatEther(await gaugeContract.earned(tokenA, user)),
          tokenB: formatEther(await gaugeContract.earned(tokenB, user)),
          volt: formatEther(await gaugeContract.earned(volt, user))
        },
        bribe: {
          tokenA: formatEther(await bribeContract.earned(tokenA, bribeAddress)),
          tokenB: formatEther(await bribeContract.earned(tokenB, bribeAddress)),
          volt: formatEther(await bribeContract.earned(volt, bribeAddress))
        }
      }
      results.push(result);
    }
    console.log(results);
  } else {
    console.log("No voter address")
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
