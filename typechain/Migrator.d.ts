/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MigratorInterface extends ethers.utils.Interface {
  functions: {
    "getOldPair(address,address)": FunctionFragment;
    "migrate(address,address,bool,uint256,uint256,uint256,uint256)": FunctionFragment;
    "migrateWithPermit(address,address,bool,uint256,uint256,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "oldFactory()": FunctionFragment;
    "quoteLiquidity(uint256,uint256,uint256)": FunctionFragment;
    "removeLiquidity(address,address,uint256,uint256,uint256)": FunctionFragment;
    "router()": FunctionFragment;
    "sortTokens(address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getOldPair",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "migrate",
    values: [
      string,
      string,
      boolean,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "migrateWithPermit",
    values: [
      string,
      string,
      boolean,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "oldFactory",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "quoteLiquidity",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidity",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "router", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sortTokens",
    values: [string, string]
  ): string;

  decodeFunctionResult(functionFragment: "getOldPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "migrate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "migrateWithPermit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "oldFactory", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "quoteLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "router", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sortTokens", data: BytesLike): Result;

  events: {};
}

export class Migrator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MigratorInterface;

  functions: {
    getOldPair(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    migrate(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    migrateWithPermit(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    oldFactory(overrides?: CallOverrides): Promise<[string]>;

    quoteLiquidity(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountB: BigNumber }>;

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    router(overrides?: CallOverrides): Promise<[string]>;

    sortTokens(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<[string, string] & { token0: string; token1: string }>;
  };

  getOldPair(
    tokenA: string,
    tokenB: string,
    overrides?: CallOverrides
  ): Promise<string>;

  migrate(
    tokenA: string,
    tokenB: string,
    stable: boolean,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  migrateWithPermit(
    tokenA: string,
    tokenB: string,
    stable: boolean,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  oldFactory(overrides?: CallOverrides): Promise<string>;

  quoteLiquidity(
    amountA: BigNumberish,
    reserveA: BigNumberish,
    reserveB: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  removeLiquidity(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  router(overrides?: CallOverrides): Promise<string>;

  sortTokens(
    tokenA: string,
    tokenB: string,
    overrides?: CallOverrides
  ): Promise<[string, string] & { token0: string; token1: string }>;

  callStatic: {
    getOldPair(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<string>;

    migrate(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    migrateWithPermit(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    oldFactory(overrides?: CallOverrides): Promise<string>;

    quoteLiquidity(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
    >;

    router(overrides?: CallOverrides): Promise<string>;

    sortTokens(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<[string, string] & { token0: string; token1: string }>;
  };

  filters: {};

  estimateGas: {
    getOldPair(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    migrate(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    migrateWithPermit(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    oldFactory(overrides?: CallOverrides): Promise<BigNumber>;

    quoteLiquidity(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    router(overrides?: CallOverrides): Promise<BigNumber>;

    sortTokens(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getOldPair(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    migrate(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    migrateWithPermit(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    oldFactory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    quoteLiquidity(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    router(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sortTokens(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
