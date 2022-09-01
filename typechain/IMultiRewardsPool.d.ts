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

interface IMultiRewardsPoolInterface extends ethers.utils.Interface {
  functions: {
    "balanceOf(address)": FunctionFragment;
    "derivedBalance(address)": FunctionFragment;
    "derivedBalances(address)": FunctionFragment;
    "derivedSupply()": FunctionFragment;
    "earned(address,address)": FunctionFragment;
    "isRewardToken(address)": FunctionFragment;
    "left(address)": FunctionFragment;
    "registerRewardToken(address)": FunctionFragment;
    "removeRewardToken(address)": FunctionFragment;
    "rewardTokens(uint256)": FunctionFragment;
    "rewardTokensLength()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "underlying()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "derivedBalance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "derivedBalances",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "derivedSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "earned",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isRewardToken",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "left", values: [string]): string;
  encodeFunctionData(
    functionFragment: "registerRewardToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeRewardToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "rewardTokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rewardTokensLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "underlying",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "derivedBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "derivedBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "derivedSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "earned", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isRewardToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "left", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerRewardToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeRewardToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardTokensLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "underlying", data: BytesLike): Result;

  events: {};
}

export class IMultiRewardsPool extends BaseContract {
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

  interface: IMultiRewardsPoolInterface;

  functions: {
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    derivedBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    derivedBalances(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    derivedSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    earned(
      token: string,
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isRewardToken(token: string, overrides?: CallOverrides): Promise<[boolean]>;

    left(token: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    registerRewardToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeRewardToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardTokens(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    rewardTokensLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    underlying(overrides?: CallOverrides): Promise<[string]>;
  };

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  derivedBalance(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  derivedBalances(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  derivedSupply(overrides?: CallOverrides): Promise<BigNumber>;

  earned(
    token: string,
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isRewardToken(token: string, overrides?: CallOverrides): Promise<boolean>;

  left(token: string, overrides?: CallOverrides): Promise<BigNumber>;

  registerRewardToken(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeRewardToken(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardTokens(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

  rewardTokensLength(overrides?: CallOverrides): Promise<BigNumber>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  underlying(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    derivedBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    derivedBalances(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    derivedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    earned(
      token: string,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isRewardToken(token: string, overrides?: CallOverrides): Promise<boolean>;

    left(token: string, overrides?: CallOverrides): Promise<BigNumber>;

    registerRewardToken(
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeRewardToken(token: string, overrides?: CallOverrides): Promise<void>;

    rewardTokens(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

    rewardTokensLength(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    underlying(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    derivedBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    derivedBalances(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    derivedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    earned(
      token: string,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isRewardToken(token: string, overrides?: CallOverrides): Promise<BigNumber>;

    left(token: string, overrides?: CallOverrides): Promise<BigNumber>;

    registerRewardToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeRewardToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardTokens(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rewardTokensLength(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    underlying(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    derivedBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    derivedBalances(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    derivedSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    earned(
      token: string,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isRewardToken(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    left(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerRewardToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeRewardToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardTokens(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rewardTokensLength(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    underlying(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}