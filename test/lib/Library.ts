import {
  BrokenToken,
  ContractTestHelper,
  SolidlyLibrary,
  Token,
  VoltFactory,
  VoltPair,
  VoltRouter01,
} from "../../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import chai from "chai";
import { Deploy } from "../../scripts/deploy/Deploy";
import { TimeUtils } from "../TimeUtils";
import { constants } from "ethers";
import { parseUnits } from "ethers/lib/utils";

const { expect } = chai;

describe("lib tests", function() {
  let owner: SignerWithAddress;
  let owner2: SignerWithAddress;

  let weth: Token;
  let mtrg: Token;
  let factory: VoltFactory;
  let router: VoltRouter01;
  let library: SolidlyLibrary;
  let pair: VoltPair;

  before(async function() {
    [owner, owner2] = await ethers.getSigners();
    weth = (await (await ethers.getContractFactory("Token", owner)).deploy(
      "WETH",
      "WETH",
      18,
      owner.address
    )) as Token;

    mtrg = (await (await ethers.getContractFactory("Token", owner)).deploy(
      "MTRG",
      "MTRG",
      18,
      owner.address
    )) as Token;

    factory = (await (
      await ethers.getContractFactory("VoltFactory", owner)
    ).deploy()) as VoltFactory;

    router = (await (
      await ethers.getContractFactory("VoltRouter01", owner)
    ).deploy(factory.address, weth.address)) as VoltRouter01;

    library = (await (
      await ethers.getContractFactory("SolidlyLibrary", owner)
    ).deploy(router.address)) as SolidlyLibrary;

    let pairAddr = await router.pairFor(weth.address, mtrg.address, true);
    pair = (await ethers.getContractAt(
      "VoltPair",
      pairAddr,
      owner
    )) as VoltPair;

    await mtrg.mint(owner.address, parseUnits("10000"));
    await weth.mint(owner.address, parseUnits("10000"));
  });

  it("add liquidity", async function() {
    await weth.approve(router.address, constants.MaxUint256);
    await mtrg.approve(router.address, constants.MaxUint256);
    let receipt = await router.addLiquidity(
      weth.address,
      mtrg.address,
      true,
      "999999933349839087",
      "1032520068817628733217",
      "0",
      "0",
      owner.address,
      "99999999999"
    );
    await receipt.wait();
  });

  it("metadata", async function() {
    let metadata = await pair.metadata();
    console.log(metadata);
  });

  it("getMinimumValue", async function() {
    let mini = await library.getMinimumValue(mtrg.address, weth.address, true);
    console.log(mini);
  });

  it("getTradeDiff 1", async function() {
    let diff = await library["getTradeDiff(uint256,address,address,bool)"](
      parseUnits("1"),
      mtrg.address,
      weth.address,
      true
    );
    console.log(diff);
  });

  it("getTradeDiff 2", async function() {
    let diff = await library["getTradeDiff(uint256,address,address)"](
      parseUnits("1"),
      mtrg.address,
      pair.address
    );
    console.log(diff);
  });
});
