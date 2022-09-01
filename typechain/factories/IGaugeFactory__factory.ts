/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IGaugeFactory, IGaugeFactoryInterface } from "../IGaugeFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "_bribe",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ve",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_allowedRewardTokens",
        type: "address[]",
      },
    ],
    name: "createGauge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "_bribe",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ve",
        type: "address",
      },
      {
        internalType: "address",
        name: "_voter",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_allowedRewardTokens",
        type: "address[]",
      },
    ],
    name: "createGaugeSingle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IGaugeFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IGaugeFactoryInterface {
    return new utils.Interface(_abi) as IGaugeFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGaugeFactory {
    return new Contract(address, _abi, signerOrProvider) as IGaugeFactory;
  }
}