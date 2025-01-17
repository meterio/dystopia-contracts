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

interface BrokenTokenInterface extends ethers.utils.Interface {
  functions: {
    "testBrokenTransfer()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "testBrokenTransfer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "testBrokenTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;

  events: {};
}

export class BrokenToken extends BaseContract {
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

  interface: BrokenTokenInterface;

  functions: {
    testBrokenTransfer(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[void]>;
  };

  testBrokenTransfer(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transfer(
    _to: string,
    _value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<void>;

  callStatic: {
    testBrokenTransfer(overrides?: CallOverrides): Promise<void>;

    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    testBrokenTransfer(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    testBrokenTransfer(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
