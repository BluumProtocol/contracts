/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  BluumFactory,
  BluumFactoryInterface,
} from "../../../contracts/nft/BluumFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_bluumNftContractImplementation",
        type: "address",
      },
      {
        internalType: "contract IAccessManager",
        name: "_accessManager",
        type: "address",
      },
      {
        internalType: "contract IWhitelist",
        name: "_whitelist",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "OnlyAdminCanCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "OnlyMinterCanCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "collectionAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "NewCollectionDeployed",
    type: "event",
  },
  {
    inputs: [],
    name: "accessManager",
    outputs: [
      {
        internalType: "contract IAccessManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bluumNftContractImplementation",
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
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    name: "deployCollection",
    outputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getCollectionAddress",
    outputs: [
      {
        internalType: "address",
        name: "_collection",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCollectionsAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "_collections",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCollectionsNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "_collectionNumber",
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
        name: "_collection",
        type: "address",
      },
    ],
    name: "isCollectionAddress",
    outputs: [
      {
        internalType: "bool",
        name: "_isCollectionAddress",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bluumNftContractImplementation",
        type: "address",
      },
    ],
    name: "setBluumNftContractImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "whitelist",
    outputs: [
      {
        internalType: "contract IWhitelist",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200128c3803806200128c8339818101604052810190620000379190620001f7565b82600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505062000253565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001358262000108565b9050919050565b620001478162000128565b81146200015357600080fd5b50565b60008151905062000167816200013c565b92915050565b60006200017a8262000128565b9050919050565b6200018c816200016d565b81146200019857600080fd5b50565b600081519050620001ac8162000181565b92915050565b6000620001bf8262000128565b9050919050565b620001d181620001b2565b8114620001dd57600080fd5b50565b600081519050620001f181620001c6565b92915050565b60008060006060848603121562000213576200021262000103565b5b6000620002238682870162000156565b935050602062000236868287016200019b565b92505060406200024986828701620001e0565b9150509250925092565b61102980620002636000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80636be5e1ab116100665780636be5e1ab146101325780636c05f05614610150578063778167ad1461018057806393e59dc11461019e578063fdcb6068146101bc57610093565b806317a4153614610098578063296fbc9e146100b45780632d5ffe8e146100e4578063333671a414610102575b600080fd5b6100b260048036038101906100ad9190610946565b6101da565b005b6100ce60048036038101906100c99190610ab9565b61031d565b6040516100db9190610b40565b60405180910390f35b6100ec610571565b6040516100f99190610b74565b60405180910390f35b61011c60048036038101906101179190610bbb565b610582565b6040516101299190610b40565b60405180910390f35b61013a61059f565b6040516101479190610ca6565b60405180910390f35b61016a60048036038101906101659190610946565b6105b0565b6040516101779190610ce3565b60405180910390f35b6101886105cd565b6040516101959190610b40565b60405180910390f35b6101a66105f3565b6040516101b39190610d5d565b60405180910390f35b6101c4610619565b6040516101d19190610d99565b60405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166391d148547fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775336040518363ffffffff1660e01b8152600401610257929190610dcd565b602060405180830381865afa158015610274573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102989190610e22565b6102d957336040517fa3a27afc0000000000000000000000000000000000000000000000000000000081526004016102d09190610b40565b60405180910390fd5b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166391d148547fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775336040518363ffffffff1660e01b815260040161039c929190610dcd565b602060405180830381865afa1580156103b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103dd9190610e22565b61041e57336040517fa3a27afc0000000000000000000000000000000000000000000000000000000081526004016104159190610b40565b60405180910390fd5b600061044b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1661063f565b90508073ffffffffffffffffffffffffffffffffffffffff16638f15b4148585600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518563ffffffff1660e01b81526004016104d09493929190610ece565b600060405180830381600087803b1580156104ea57600080fd5b505af11580156104fe573d6000803e3d6000fd5b505050506105168160006106f990919063ffffffff16565b508091508073ffffffffffffffffffffffffffffffffffffffff167fb8a4706970925da6afe6fc677a62a72aafebd73a53b1980946ba539a965c49748585604051610562929190610f21565b60405180910390a25092915050565b600061057d6000610729565b905090565b600061059882600061073e90919063ffffffff16565b9050919050565b60606105ab6000610758565b905090565b60006105c682600061077990919063ffffffff16565b9050919050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036106f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106eb90610fa4565b60405180910390fd5b919050565b6000610721836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6107a9565b905092915050565b600061073782600001610819565b9050919050565b600061074d836000018361082a565b60001c905092915050565b6060600061076883600001610855565b905060608190508092505050919050565b60006107a1836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6108b1565b905092915050565b60006107b583836108b1565b61080e578260000182908060018154018082558091505060019003906000526020600020016000909190919091505582600001805490508360010160008481526020019081526020016000208190555060019050610813565b600090505b92915050565b600081600001805490509050919050565b600082600001828154811061084257610841610fc4565b5b9060005260206000200154905092915050565b6060816000018054806020026020016040519081016040528092919081815260200182805480156108a557602002820191906000526020600020905b815481526020019060010190808311610891575b50505050509050919050565b600080836001016000848152602001908152602001600020541415905092915050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610913826108e8565b9050919050565b61092381610908565b811461092e57600080fd5b50565b6000813590506109408161091a565b92915050565b60006020828403121561095c5761095b6108de565b5b600061096a84828501610931565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6109c68261097d565b810181811067ffffffffffffffff821117156109e5576109e461098e565b5b80604052505050565b60006109f86108d4565b9050610a0482826109bd565b919050565b600067ffffffffffffffff821115610a2457610a2361098e565b5b610a2d8261097d565b9050602081019050919050565b82818337600083830152505050565b6000610a5c610a5784610a09565b6109ee565b905082815260208101848484011115610a7857610a77610978565b5b610a83848285610a3a565b509392505050565b600082601f830112610aa057610a9f610973565b5b8135610ab0848260208601610a49565b91505092915050565b60008060408385031215610ad057610acf6108de565b5b600083013567ffffffffffffffff811115610aee57610aed6108e3565b5b610afa85828601610a8b565b925050602083013567ffffffffffffffff811115610b1b57610b1a6108e3565b5b610b2785828601610a8b565b9150509250929050565b610b3a81610908565b82525050565b6000602082019050610b556000830184610b31565b92915050565b6000819050919050565b610b6e81610b5b565b82525050565b6000602082019050610b896000830184610b65565b92915050565b610b9881610b5b565b8114610ba357600080fd5b50565b600081359050610bb581610b8f565b92915050565b600060208284031215610bd157610bd06108de565b5b6000610bdf84828501610ba6565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610c1d81610908565b82525050565b6000610c2f8383610c14565b60208301905092915050565b6000602082019050919050565b6000610c5382610be8565b610c5d8185610bf3565b9350610c6883610c04565b8060005b83811015610c99578151610c808882610c23565b9750610c8b83610c3b565b925050600181019050610c6c565b5085935050505092915050565b60006020820190508181036000830152610cc08184610c48565b905092915050565b60008115159050919050565b610cdd81610cc8565b82525050565b6000602082019050610cf86000830184610cd4565b92915050565b6000819050919050565b6000610d23610d1e610d19846108e8565b610cfe565b6108e8565b9050919050565b6000610d3582610d08565b9050919050565b6000610d4782610d2a565b9050919050565b610d5781610d3c565b82525050565b6000602082019050610d726000830184610d4e565b92915050565b6000610d8382610d2a565b9050919050565b610d9381610d78565b82525050565b6000602082019050610dae6000830184610d8a565b92915050565b6000819050919050565b610dc781610db4565b82525050565b6000604082019050610de26000830185610dbe565b610def6020830184610b31565b9392505050565b610dff81610cc8565b8114610e0a57600080fd5b50565b600081519050610e1c81610df6565b92915050565b600060208284031215610e3857610e376108de565b5b6000610e4684828501610e0d565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610e89578082015181840152602081019050610e6e565b60008484015250505050565b6000610ea082610e4f565b610eaa8185610e5a565b9350610eba818560208601610e6b565b610ec38161097d565b840191505092915050565b60006080820190508181036000830152610ee88187610e95565b90508181036020830152610efc8186610e95565b9050610f0b6040830185610d8a565b610f186060830184610d4e565b95945050505050565b60006040820190508181036000830152610f3b8185610e95565b90508181036020830152610f4f8184610e95565b90509392505050565b7f455243313136373a20637265617465206661696c656400000000000000000000600082015250565b6000610f8e601683610e5a565b9150610f9982610f58565b602082019050919050565b60006020820190508181036000830152610fbd81610f81565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea26469706673582212209238226b8dfb567384aa45b24cf336d761e7e677bd81adfd0e3aa81868874e2164736f6c63430008120033";

type BluumFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BluumFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BluumFactory__factory extends ContractFactory {
  constructor(...args: BluumFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _bluumNftContractImplementation: PromiseOrValue<string>,
    _accessManager: PromiseOrValue<string>,
    _whitelist: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BluumFactory> {
    return super.deploy(
      _bluumNftContractImplementation,
      _accessManager,
      _whitelist,
      overrides || {}
    ) as Promise<BluumFactory>;
  }
  override getDeployTransaction(
    _bluumNftContractImplementation: PromiseOrValue<string>,
    _accessManager: PromiseOrValue<string>,
    _whitelist: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _bluumNftContractImplementation,
      _accessManager,
      _whitelist,
      overrides || {}
    );
  }
  override attach(address: string): BluumFactory {
    return super.attach(address) as BluumFactory;
  }
  override connect(signer: Signer): BluumFactory__factory {
    return super.connect(signer) as BluumFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BluumFactoryInterface {
    return new utils.Interface(_abi) as BluumFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BluumFactory {
    return new Contract(address, _abi, signerOrProvider) as BluumFactory;
  }
}