/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IBluumFactoryInterface extends utils.Interface {
  functions: {
    "deployCollection(string,string)": FunctionFragment;
    "getCollectionAddress(uint256)": FunctionFragment;
    "getCollectionsAddresses()": FunctionFragment;
    "getCollectionsNumber()": FunctionFragment;
    "isCollectionAddress(address)": FunctionFragment;
    "setBluumNftContractImplementation(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deployCollection"
      | "getCollectionAddress"
      | "getCollectionsAddresses"
      | "getCollectionsNumber"
      | "isCollectionAddress"
      | "setBluumNftContractImplementation"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deployCollection",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectionAddress",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectionsAddresses",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectionsNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isCollectionAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setBluumNftContractImplementation",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "deployCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectionAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectionsAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectionsNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isCollectionAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBluumNftContractImplementation",
    data: BytesLike
  ): Result;

  events: {
    "NewCollectionDeployed(address,string,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewCollectionDeployed"): EventFragment;
}

export interface NewCollectionDeployedEventObject {
  collectionAddress: string;
  name: string;
  symbol: string;
}
export type NewCollectionDeployedEvent = TypedEvent<
  [string, string, string],
  NewCollectionDeployedEventObject
>;

export type NewCollectionDeployedEventFilter =
  TypedEventFilter<NewCollectionDeployedEvent>;

export interface IBluumFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IBluumFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deployCollection(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getCollectionAddress(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { _collection: string }>;

    getCollectionsAddresses(
      overrides?: CallOverrides
    ): Promise<[string[]] & { _collections: string[] }>;

    getCollectionsNumber(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _collectionNumber: BigNumber }>;

    isCollectionAddress(
      _collection: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean] & { _isCollectionAddress: boolean }>;

    setBluumNftContractImplementation(
      _bluumNftContractImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  deployCollection(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getCollectionAddress(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getCollectionsAddresses(overrides?: CallOverrides): Promise<string[]>;

  getCollectionsNumber(overrides?: CallOverrides): Promise<BigNumber>;

  isCollectionAddress(
    _collection: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setBluumNftContractImplementation(
    _bluumNftContractImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deployCollection(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getCollectionAddress(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getCollectionsAddresses(overrides?: CallOverrides): Promise<string[]>;

    getCollectionsNumber(overrides?: CallOverrides): Promise<BigNumber>;

    isCollectionAddress(
      _collection: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setBluumNftContractImplementation(
      _bluumNftContractImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "NewCollectionDeployed(address,string,string)"(
      collectionAddress?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null
    ): NewCollectionDeployedEventFilter;
    NewCollectionDeployed(
      collectionAddress?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null
    ): NewCollectionDeployedEventFilter;
  };

  estimateGas: {
    deployCollection(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getCollectionAddress(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollectionsAddresses(overrides?: CallOverrides): Promise<BigNumber>;

    getCollectionsNumber(overrides?: CallOverrides): Promise<BigNumber>;

    isCollectionAddress(
      _collection: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setBluumNftContractImplementation(
      _bluumNftContractImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deployCollection(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getCollectionAddress(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollectionsAddresses(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollectionsNumber(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isCollectionAddress(
      _collection: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setBluumNftContractImplementation(
      _bluumNftContractImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}