/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BrokenWMTR, BrokenWMTRInterface } from "../BrokenWMTR";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_decimals",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldVault",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newVault",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "effectiveTime",
        type: "uint256",
      },
    ],
    name: "LogChangeVault",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ERR_INVALID_ZERO_VALUE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ERR_NO_ERROR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
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
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimFees",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "i",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
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
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260006004553480156200001657600080fd5b506040516200122038038062001220833981016040819052620000399162000348565b83516200004e906002906020870190620001d5565b50825162000064906001906020860190620001d5565b50600382905560405146907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f906200009f9060029062000419565b60408051918290038220828201825260018352603160f81b6020938401528151928301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc66060820152608081018290523060a082015260c00160408051601f1981840301815291905280516020909101206007556200012a33600062000136565b505050505050620004e3565b6001600160a01b03821660009081526005602052604081208054839190839062000162908490620004bc565b9250508190555081600460008282546200017d9190620004bc565b909155505060408051600081526001600160a01b03851660208201529081018390527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060600160405180910390a150600192915050565b828054620001e390620003dd565b90600052602060002090601f01602090048101928262000207576000855562000252565b82601f106200022257805160ff191683800117855562000252565b8280016001018555821562000252579182015b828111156200025257825182559160200191906001019062000235565b506200026092915062000264565b5090565b5b8082111562000260576000815560010162000265565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620002a357600080fd5b81516001600160401b0380821115620002c057620002c06200027b565b604051601f8301601f19908116603f01168101908282118183101715620002eb57620002eb6200027b565b816040528381526020925086838588010111156200030857600080fd5b600091505b838210156200032c57858201830151818301840152908201906200030d565b838211156200033e5760008385830101525b9695505050505050565b600080600080608085870312156200035f57600080fd5b84516001600160401b03808211156200037757600080fd5b620003858883890162000291565b955060208701519150808211156200039c57600080fd5b50620003ab8782880162000291565b60408701516060880151919550935090506001600160a01b0381168114620003d257600080fd5b939692955090935050565b600181811c90821680620003f257607f821691505b6020821081036200041357634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c9150808316806200043657607f831692505b602080841082036200045657634e487b7160e01b86526022600452602486fd5b8180156200046d57600181146200047f57620004ae565b60ff19861689528489019650620004ae565b60008a81526020902060005b86811015620004a65781548b8201529085019083016200048b565b505084890196505b509498975050505050505050565b60008219821115620004de57634e487b7160e01b600052601160045260246000fd5b500190565b610d2d80620004f36000396000f3fe6080604052600436106101405760003560e01c806370a08231116100b6578063d294f0931161006f578063d294f09314610365578063d505accf14610386578063dd62ed3e146103a8578063e3d670d7146103e0578063e5aa3d5814610416578063fc0c546a1461042c57600080fd5b806370a08231146102ae5780637ecebe00146102db57806395d89b41146103085780639dc29fac1461031d578063a9059cbb1461033d578063d0e30db01461035d57600080fd5b806330adf81f1161010857806330adf81f14610204578063313ce5671461023857806335052d6e1461024e5780633644e5151461026357806340c10f19146102795780636d7497b31461029957600080fd5b806306fdde0314610145578063095ea7b31461017057806318160ddd146101a057806323b872dd146101c45780632e1a7d4d146101e4575b600080fd5b34801561015157600080fd5b5061015a610447565b6040516101679190610a8a565b60405180910390f35b34801561017c57600080fd5b5061019061018b366004610afb565b6104d5565b6040519015158152602001610167565b3480156101ac57600080fd5b506101b660045481565b604051908152602001610167565b3480156101d057600080fd5b506101906101df366004610b25565b610540565b3480156101f057600080fd5b506101b66101ff366004610b61565b610606565b34801561021057600080fd5b506101b67f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b34801561024457600080fd5b506101b660035481565b34801561025a57600080fd5b506101b6600081565b34801561026f57600080fd5b506101b660075481565b34801561028557600080fd5b50610190610294366004610afb565b61062b565b3480156102a557600080fd5b506101b6600181565b3480156102ba57600080fd5b506101b66102c9366004610b7a565b60056020526000908152604090205481565b3480156102e757600080fd5b506101b66102f6366004610b7a565b60086020526000908152604090205481565b34801561031457600080fd5b5061015a610641565b34801561032957600080fd5b50610190610338366004610afb565b61064e565b34801561034957600080fd5b50610190610358366004610afb565b6106c9565b6101b66106dd565b34801561037157600080fd5b50604080516000808252602082015201610167565b34801561039257600080fd5b506103a66103a1366004610b95565b6106ff565b005b3480156103b457600080fd5b506101b66103c3366004610c08565b600660209081526000928352604080842090915290825290205481565b3480156103ec57600080fd5b506101b66103fb366004610b7a565b6001600160a01b031660009081526005602052604090205490565b34801561042257600080fd5b506101b660005481565b34801561043857600080fd5b50604051308152602001610167565b6002805461045490610c3b565b80601f016020809104026020016040519081016040528092919081815260200182805461048090610c3b565b80156104cd5780601f106104a2576101008083540402835291602001916104cd565b820191906000526020600020905b8154815290600101906020018083116104b057829003601f168201915b505050505081565b3360008181526006602090815260408083206001600160a01b03871684529091528082208490555190917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259161052f919086908690610c75565b60405180910390a150600192915050565b6001600160a01b0383166000908152600660209081526040808320338452909152812054828110156105b05760405162461bcd60e51b81526020600482015260146024820152734e6f7420656e6f75676820616c6c6f77616e636560601b60448201526064015b60405180910390fd5b60001981146105f2576001600160a01b0385166000908152600660209081526040808320338452909152812080548592906105ec908490610caf565b90915550505b6105fd85858561096b565b95945050505050565b60008160000361061857506001919050565b610622338361064e565b50600192915050565b60006106378383610a0d565b5060019392505050565b6001805461045490610c3b565b600081600460008282546106629190610caf565b90915550506001600160a01b0383166000908152600560205260408120805484929061068f908490610caf565b90915550506040517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061052f9085906000908690610c75565b60006106d633848461096b565b9392505050565b6000346000036106ed5750600190565b6106f73334610a0d565b506000905090565b428410156107435760405162461bcd60e51b815260206004820152601160248201527014dd18589b19558c4e8811561412549151607a1b60448201526064016105a7565b6007546001600160a01b038816600090815260086020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b91908761079683610cc6565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e0016040516020818303038152906040528051906020012060405160200161080f92919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa15801561087a573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906108b05750886001600160a01b0316816001600160a01b0316145b6108fc5760405162461bcd60e51b815260206004820152601b60248201527f537461626c6556313a20494e56414c49445f5349474e4154555245000000000060448201526064016105a7565b6001600160a01b03808a166000908152600660209081526040808320938c168352929052819020889055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610958908b908b908b90610c75565b60405180910390a1505050505050505050565b6001600160a01b038316600090815260056020526040812080548391908390610995908490610caf565b90915550506001600160a01b038316600090815260056020526040812080548492906109c2908490610cdf565b90915550506040517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906109fb90869086908690610c75565b60405180910390a15060019392505050565b6001600160a01b038216600090815260056020526040812080548391908390610a37908490610cdf565b925050819055508160046000828254610a509190610cdf565b90915550506040517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061052f9060009086908690610c75565b600060208083528351808285015260005b81811015610ab757858101830151858201604001528201610a9b565b81811115610ac9576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610af657600080fd5b919050565b60008060408385031215610b0e57600080fd5b610b1783610adf565b946020939093013593505050565b600080600060608486031215610b3a57600080fd5b610b4384610adf565b9250610b5160208501610adf565b9150604084013590509250925092565b600060208284031215610b7357600080fd5b5035919050565b600060208284031215610b8c57600080fd5b6106d682610adf565b600080600080600080600060e0888a031215610bb057600080fd5b610bb988610adf565b9650610bc760208901610adf565b95506040880135945060608801359350608088013560ff81168114610beb57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610c1b57600080fd5b610c2483610adf565b9150610c3260208401610adf565b90509250929050565b600181811c90821680610c4f57607f821691505b602082108103610c6f57634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b634e487b7160e01b600052601160045260246000fd5b600082821015610cc157610cc1610c99565b500390565b600060018201610cd857610cd8610c99565b5060010190565b60008219821115610cf257610cf2610c99565b50019056fea26469706673582212201500f7a1d9e9b26eac883e3c672c647edd12317c64ed89a2da464d276d8d846464736f6c634300080d0033";

export class BrokenWMTR__factory extends ContractFactory {
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
    _name: string,
    _symbol: string,
    _decimals: BigNumberish,
    arg3: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BrokenWMTR> {
    return super.deploy(
      _name,
      _symbol,
      _decimals,
      arg3,
      overrides || {}
    ) as Promise<BrokenWMTR>;
  }
  getDeployTransaction(
    _name: string,
    _symbol: string,
    _decimals: BigNumberish,
    arg3: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _decimals,
      arg3,
      overrides || {}
    );
  }
  attach(address: string): BrokenWMTR {
    return super.attach(address) as BrokenWMTR;
  }
  connect(signer: Signer): BrokenWMTR__factory {
    return super.connect(signer) as BrokenWMTR__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BrokenWMTRInterface {
    return new utils.Interface(_abi) as BrokenWMTRInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BrokenWMTR {
    return new Contract(address, _abi, signerOrProvider) as BrokenWMTR;
  }
}