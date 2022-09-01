/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ContractTestHelper2,
  ContractTestHelper2Interface,
} from "../ContractTestHelper2";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061018a806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063150b7a0214610030575b600080fd5b61004361003e3660046100b9565b610060565b6040516001600160e01b0319909116815260200160405180910390f35b60405162461bcd60e51b815260206004820152600b60248201526a1cdd1d58881c995d995c9d60aa1b604482015260009060640160405180910390fd5b80356001600160a01b03811681146100b457600080fd5b919050565b6000806000806000608086880312156100d157600080fd5b6100da8661009d565b94506100e86020870161009d565b935060408601359250606086013567ffffffffffffffff8082111561010c57600080fd5b818801915088601f83011261012057600080fd5b81358181111561012f57600080fd5b89602082850101111561014157600080fd5b969995985093965060200194939250505056fea2646970667358221220278f42ee364780e674a347f0554a7f1f18bd009c281961af35c49e79c3e3710664736f6c634300080d0033";

export class ContractTestHelper2__factory extends ContractFactory {
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
  ): Promise<ContractTestHelper2> {
    return super.deploy(overrides || {}) as Promise<ContractTestHelper2>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ContractTestHelper2 {
    return super.attach(address) as ContractTestHelper2;
  }
  connect(signer: Signer): ContractTestHelper2__factory {
    return super.connect(signer) as ContractTestHelper2__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ContractTestHelper2Interface {
    return new utils.Interface(_abi) as ContractTestHelper2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ContractTestHelper2 {
    return new Contract(address, _abi, signerOrProvider) as ContractTestHelper2;
  }
}