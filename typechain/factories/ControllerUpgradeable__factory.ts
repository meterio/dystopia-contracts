/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ControllerUpgradeable,
  ControllerUpgradeableInterface,
} from "../ControllerUpgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "SetGovernance",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "SetVeDist",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "SetVoter",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "governance",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_governance",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingGovernance",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_value",
        type: "address",
      },
    ],
    name: "setGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_value",
        type: "address",
      },
    ],
    name: "setVeDist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_value",
        type: "address",
      },
    ],
    name: "setVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "veDist",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "voter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506104bc806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80635aa6e675116100665780635aa6e675146100f7578063ab033ea914610110578063c13270f114610123578063c4d66de814610136578063f39c38a01461014957600080fd5b8063238efcbc1461009857806327e65278146100a257806346c96aac146100b55780634bc2a657146100e4575b600080fd5b6100a061015c565b005b6100a06100b0366004610435565b6101d8565b6003546100c8906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6100a06100f2366004610435565b61025d565b6000546100c8906201000090046001600160a01b031681565b6100a061011e366004610435565b6102db565b6002546100c8906001600160a01b031681565b6100a0610144366004610435565b610359565b6001546100c8906001600160a01b031681565b6001546001600160a01b031633146101ad5760405162461bcd60e51b815260206004820152600f60248201526e2737ba103832b73234b7339033b7bb60891b60448201526064015b60405180910390fd5b6001546000805462010000600160b01b0319166001600160a01b039092166201000002919091179055565b6000546201000090046001600160a01b031633146102085760405162461bcd60e51b81526004016101a490610465565b600280546001600160a01b0319166001600160a01b0383169081179091556040519081527f427d619a0a9852319231312bf3a2f7e361f12399aae2c315cc710a8055cc6ba3906020015b60405180910390a150565b6000546201000090046001600160a01b0316331461028d5760405162461bcd60e51b81526004016101a490610465565b600380546001600160a01b0319166001600160a01b0383169081179091556040519081527fc6ff127433b785c51da9ae4088ee184c909b1a55b9afd82ae6c64224d3bc15d290602001610252565b6000546201000090046001600160a01b0316331461030b5760405162461bcd60e51b81526004016101a490610465565b600180546001600160a01b0319166001600160a01b0383169081179091556040519081527f24a8c4807b324a269a51827c3446b8ac1cc13810d7d0c0ca1efafabddd7b621990602001610252565b600054610100900460ff166103745760005460ff1615610378565b303b155b6103db5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016101a4565b600054610100900460ff161580156103fd576000805461ffff19166101011790555b6000805462010000600160b01b031916620100006001600160a01b038516021790558015610431576000805461ff00191690555b5050565b60006020828403121561044757600080fd5b81356001600160a01b038116811461045e57600080fd5b9392505050565b6020808252600790820152662737ba1033b7bb60c91b60408201526060019056fea2646970667358221220f0cff9dcecb497f40eca407d45fb273e51c5cddcf9a91b1557f17f182cf6353364736f6c634300080d0033";

export class ControllerUpgradeable__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ControllerUpgradeable> {
    return super.deploy(overrides || {}) as Promise<ControllerUpgradeable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ControllerUpgradeable {
    return super.attach(address) as ControllerUpgradeable;
  }
  connect(signer: Signer): ControllerUpgradeable__factory {
    return super.connect(signer) as ControllerUpgradeable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ControllerUpgradeableInterface {
    return new utils.Interface(_abi) as ControllerUpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ControllerUpgradeable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ControllerUpgradeable;
  }
}