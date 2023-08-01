import {
  ContractTestHelper,
  VoltFactory,
  VoltPair,
  VoltRouter01,
  IERC20__factory,
  Token
} from "../../../typechain";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import chai from "chai";
import {Deploy} from "../../../scripts/deploy/Deploy";
import {TimeUtils} from "../../TimeUtils";
import {TestHelper} from "../../TestHelper";
import {BigNumber, utils} from "ethers";
import {formatUnits, parseUnits} from "ethers/lib/utils";
import {Misc} from "../../../scripts/Misc";

const {expect} = chai;

describe("pair tests", function () {

  let snapshotBefore: string;
  let snapshot: string;

  let owner: SignerWithAddress;
  let owner2: SignerWithAddress;
  let owner3: SignerWithAddress;
  let factory: VoltFactory;
  let router: VoltRouter01;
  let testHelper: ContractTestHelper;

  let ust: Token;
  let mim: Token;
  let dai: Token;
  let wmatic: Token;

  let pair: VoltPair;
  let pair2: VoltPair;


  before(async function () {
    snapshotBefore = await TimeUtils.snapshot();
    [owner, owner2, owner3] = await ethers.getSigners();
    // wmatic
    wmatic = await Deploy.deployContract(owner, 'Token', 'WMATIC', 'WMATIC', 18, owner.address) as Token;
    // mint 10000
    await wmatic.mint(owner.address, parseUnits('10000'))
    // deploy factory
    factory = await Deploy.deployVoltFactory(owner);
    // deploy router
    router = await Deploy.deployVoltRouter01(owner, factory.address, wmatic.address);

    // deploy ust,mim,dai and mint 100, transfer to owner2
    [ust, mim, dai] = await TestHelper.createMockTokensAndMint(owner);
    await ust.transfer(owner2.address, utils.parseUnits('100', 6));
    await mim.transfer(owner2.address, utils.parseUnits('100'));
    await dai.transfer(owner2.address, utils.parseUnits('100'));

    // addLiquidity mim/ust 1:1
    pair = await TestHelper.addLiquidity(
      factory,
      router,
      owner,
      mim.address,
      ust.address,
      utils.parseUnits('1'),
      utils.parseUnits('1', 6),
      true
    );
    // addLiquidity mim/wmatic 1:1
    pair2 = await TestHelper.addLiquidity(
      factory,
      router,
      owner,
      mim.address,
      wmatic.address,
      utils.parseUnits('1'),
      utils.parseUnits('1'),
      true
    );
    // testhelper
    testHelper = await Deploy.deployContract(owner, 'ContractTestHelper') as ContractTestHelper;
  });

  after(async function () {
    await TimeUtils.rollback(snapshotBefore);
  });


  beforeEach(async function () {
    snapshot = await TimeUtils.snapshot();
  });

  afterEach(async function () {
    await TimeUtils.rollback(snapshot);
  });

  it("sync test", async function () {
    await mim.transfer(pair.address, parseUnits('0.001'));
    await ust.transfer(pair.address, parseUnits('0.001', 6));
    await pair.sync();
    expect(await pair.reserve0()).is.not.eq(0);
    expect(await pair.reserve1()).is.not.eq(0);
  });

  it("very little swap", async function () {
    await mim.approve(router.address, parseUnits('1'));
    await wmatic.approve(router.address, parseUnits('1'));
    await router.swapExactTokensForTokens(2, BigNumber.from(0), [{
      from: mim.address,
      to: wmatic.address,
      stable: true,
    }], owner.address, 9999999999);
    await router.swapExactTokensForTokens(2, BigNumber.from(0), [{
      to: mim.address,
      from: wmatic.address,
      stable: true,
    }], owner.address, 9999999999);
  });

  it("k revert", async function () {
    await mim.transfer(pair2.address, 1);
    await expect(pair2.swap(10000000, 1000000, owner.address, '0x')).revertedWith('VoltPair: K');
  });

  it("swap loop test", async function () {
    const loop1 = await swapInLoop(owner, factory, router, 1);
    const loop100 = await swapInLoop(owner, factory, router, 10);
    expect(loop100.sub(loop1)).is.below(10);
  });

  it("swap gas", async function () {
    const token0 = await pair.token0();
    const token1 = await pair.token1();
    await IERC20__factory.connect(token0, owner).transfer(pair.address, 1000000);
    await IERC20__factory.connect(token1, owner).transfer(pair.address, 1000000);
    const tx = await pair.swap(0, 10, owner.address, '0x')
    const receipt = await tx.wait()
    expect(receipt.gasUsed).is.below(BigNumber.from(280000));
  });

  it("mint gas", async function () {
    const token0 = await pair.token0();
    const token1 = await pair.token1();
    await IERC20__factory.connect(token0, owner).transfer(pair.address, 100000000);
    await IERC20__factory.connect(token1, owner).transfer(pair.address, 100000000);
    const tx = await pair.mint(owner.address);
    const receipt = await tx.wait()
    expect(receipt.gasUsed).below(BigNumber.from(140000));
  });

  it("burn gas", async function () {
    const token0 = await pair.token0();
    const token1 = await pair.token1();
    await IERC20__factory.connect(token0, owner).transfer(pair.address, 100000000);
    await IERC20__factory.connect(token1, owner).transfer(pair.address, 100000000);
    await pair.mint(owner.address);
    await IERC20__factory.connect(pair.address, owner).transfer(pair.address, 100000000)
    const tx = await pair.burn(owner.address);
    const receipt = await tx.wait()
    expect(receipt.gasUsed).below(BigNumber.from(130000));
  });


});

async function swapInLoop(
  owner: SignerWithAddress,
  factory: VoltFactory,
  router: VoltRouter01,
  loops: number,
) {
  const amount = parseUnits('1');
  const tokenA = await Deploy.deployContract(owner, 'Token', 'UST', 'UST', 18, owner.address) as Token;
  await tokenA.mint(owner.address, amount.mul(2));
  const tokenB = await Deploy.deployContract(owner, 'Token', 'MIM', 'MIM', 18, owner.address) as Token;
  await tokenB.mint(owner.address, amount.mul(2));

  await TestHelper.addLiquidity(
    factory,
    router,
    owner,
    tokenA.address,
    tokenB.address,
    amount,
    amount,
    true
  );

  const balB = await tokenB.balanceOf(owner.address);

  await tokenA.approve(router.address, parseUnits('100'));
  for (let i = 0; i < loops; i++) {
    await router.swapExactTokensForTokens(
      amount.div(100).div(loops),
      0,
      [{from: tokenA.address, to: tokenB.address, stable: true}],
      owner.address,
      BigNumber.from('999999999999999999'),
    );
  }
  return (await tokenB.balanceOf(owner.address)).sub(balB);
}


