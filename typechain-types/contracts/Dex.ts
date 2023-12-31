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
  PayableOverrides,
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
} from "../common";

export declare namespace IBluumNft {
  export type MetadataStruct = {
    publicURI: PromiseOrValue<BytesLike>;
    hashPrivateURI: PromiseOrValue<BytesLike>;
  };

  export type MetadataStructOutput = [string, string] & {
    publicURI: string;
    hashPrivateURI: string;
  };
}

export declare namespace IDex {
  export type PriceStruct = {
    paymentTokens: PromiseOrValue<string>[];
    prices: PromiseOrValue<BigNumberish>[];
  };

  export type PriceStructOutput = [string[], BigNumber[]] & {
    paymentTokens: string[];
    prices: BigNumber[];
  };
}

export interface DexInterface extends utils.Interface {
  functions: {
    "accessManager()": FunctionFragment;
    "addCollections(address[])": FunctionFragment;
    "addPaymentTokens(address,address[])": FunctionFragment;
    "buyNft(address,address,uint256)": FunctionFragment;
    "getAvailableStatus(address,uint256[])": FunctionFragment;
    "getNftsMetadata(address,uint256[])": FunctionFragment;
    "getPaymentTokenPrice(address,uint256,address[])": FunctionFragment;
    "getPaymentTokens(address)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "removeCollections(address[])": FunctionFragment;
    "removePaymentTokens(address,address[])": FunctionFragment;
    "setAvailableStatus(address,uint256[],bool[])": FunctionFragment;
    "setDecimals(address[],uint256[])": FunctionFragment;
    "setMetadata(address,uint256[],(bytes,bytes32)[])": FunctionFragment;
    "setPrices(address,(address[],uint256[])[],uint256[])": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "accessManager"
      | "addCollections"
      | "addPaymentTokens"
      | "buyNft"
      | "getAvailableStatus"
      | "getNftsMetadata"
      | "getPaymentTokenPrice"
      | "getPaymentTokens"
      | "initialize"
      | "proxiableUUID"
      | "removeCollections"
      | "removePaymentTokens"
      | "setAvailableStatus"
      | "setDecimals"
      | "setMetadata"
      | "setPrices"
      | "upgradeTo"
      | "upgradeToAndCall"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "accessManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addCollections",
    values: [PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addPaymentTokens",
    values: [PromiseOrValue<string>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "buyNft",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAvailableStatus",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getNftsMetadata",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getPaymentTokenPrice",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getPaymentTokens",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeCollections",
    values: [PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "removePaymentTokens",
    values: [PromiseOrValue<string>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setAvailableStatus",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<boolean>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setDecimals",
    values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setMetadata",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      IBluumNft.MetadataStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setPrices",
    values: [
      PromiseOrValue<string>,
      IDex.PriceStruct[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "accessManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addCollections",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addPaymentTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buyNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAvailableStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftsMetadata",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPaymentTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPaymentTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeCollections",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removePaymentTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAvailableStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDecimals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMetadata",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setPrices", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;

  events: {
    "AdminChanged(address,address)": EventFragment;
    "AvailableStatusSet(address,uint256,bool)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "CollectionAdded(address)": EventFragment;
    "CollectionRemoved(address)": EventFragment;
    "DecimalSet(address,uint256)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "MetadataSet(address,uint256,bytes,bytes32)": EventFragment;
    "NftBought(address,uint256,uint256,address,uint256,address)": EventFragment;
    "PaymentTokenAdded(address,address)": EventFragment;
    "PaymentTokenRemoved(address,address)": EventFragment;
    "PriceSet(address,uint256,address,uint256)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AvailableStatusSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CollectionAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CollectionRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DecimalSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MetadataSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NftBought"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PaymentTokenAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PaymentTokenRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PriceSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}

export interface AdminChangedEventObject {
  previousAdmin: string;
  newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<
  [string, string],
  AdminChangedEventObject
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export interface AvailableStatusSetEventObject {
  collection: string;
  sku: BigNumber;
  isAvailable: boolean;
}
export type AvailableStatusSetEvent = TypedEvent<
  [string, BigNumber, boolean],
  AvailableStatusSetEventObject
>;

export type AvailableStatusSetEventFilter =
  TypedEventFilter<AvailableStatusSetEvent>;

export interface BeaconUpgradedEventObject {
  beacon: string;
}
export type BeaconUpgradedEvent = TypedEvent<
  [string],
  BeaconUpgradedEventObject
>;

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;

export interface CollectionAddedEventObject {
  collection: string;
}
export type CollectionAddedEvent = TypedEvent<
  [string],
  CollectionAddedEventObject
>;

export type CollectionAddedEventFilter = TypedEventFilter<CollectionAddedEvent>;

export interface CollectionRemovedEventObject {
  collection: string;
}
export type CollectionRemovedEvent = TypedEvent<
  [string],
  CollectionRemovedEventObject
>;

export type CollectionRemovedEventFilter =
  TypedEventFilter<CollectionRemovedEvent>;

export interface DecimalSetEventObject {
  paymentToken: string;
  decimals: BigNumber;
}
export type DecimalSetEvent = TypedEvent<
  [string, BigNumber],
  DecimalSetEventObject
>;

export type DecimalSetEventFilter = TypedEventFilter<DecimalSetEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface MetadataSetEventObject {
  collection: string;
  sku: BigNumber;
  publicURI: string;
  hashPrivateURI: string;
}
export type MetadataSetEvent = TypedEvent<
  [string, BigNumber, string, string],
  MetadataSetEventObject
>;

export type MetadataSetEventFilter = TypedEventFilter<MetadataSetEvent>;

export interface NftBoughtEventObject {
  collection: string;
  sku: BigNumber;
  tokenId: BigNumber;
  paymentToken: string;
  price: BigNumber;
  buyer: string;
}
export type NftBoughtEvent = TypedEvent<
  [string, BigNumber, BigNumber, string, BigNumber, string],
  NftBoughtEventObject
>;

export type NftBoughtEventFilter = TypedEventFilter<NftBoughtEvent>;

export interface PaymentTokenAddedEventObject {
  collection: string;
  paymentToken: string;
}
export type PaymentTokenAddedEvent = TypedEvent<
  [string, string],
  PaymentTokenAddedEventObject
>;

export type PaymentTokenAddedEventFilter =
  TypedEventFilter<PaymentTokenAddedEvent>;

export interface PaymentTokenRemovedEventObject {
  collection: string;
  paymentToken: string;
}
export type PaymentTokenRemovedEvent = TypedEvent<
  [string, string],
  PaymentTokenRemovedEventObject
>;

export type PaymentTokenRemovedEventFilter =
  TypedEventFilter<PaymentTokenRemovedEvent>;

export interface PriceSetEventObject {
  collection: string;
  sku: BigNumber;
  paymentToken: string;
  price: BigNumber;
}
export type PriceSetEvent = TypedEvent<
  [string, BigNumber, string, BigNumber],
  PriceSetEventObject
>;

export type PriceSetEventFilter = TypedEventFilter<PriceSetEvent>;

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface Dex extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DexInterface;

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
    accessManager(overrides?: CallOverrides): Promise<[string]>;

    addCollections(
      _collections: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addPaymentTokens(
      _collection: PromiseOrValue<string>,
      _tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    buyNft(
      _paymentToken: PromiseOrValue<string>,
      _collection: PromiseOrValue<string>,
      _sku: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAvailableStatus(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<[boolean[]] & { availableStatus: boolean[] }>;

    getNftsMetadata(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<
      [IBluumNft.MetadataStructOutput[]] & {
        _metadata: IBluumNft.MetadataStructOutput[];
      }
    >;

    getPaymentTokenPrice(
      _collection: PromiseOrValue<string>,
      _sku: PromiseOrValue<BigNumberish>,
      _tokens: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber[], BigNumber[]] & {
        _prices: BigNumber[];
        _decimals: BigNumber[];
      }
    >;

    getPaymentTokens(
      _collection: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[]] & { _tokens: string[] }>;

    initialize(
      _teamWallet: PromiseOrValue<string>,
      _accessManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    removeCollections(
      _collections: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removePaymentTokens(
      _collection: PromiseOrValue<string>,
      _tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAvailableStatus(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      _isAvailable: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setDecimals(
      _tokens: PromiseOrValue<string>[],
      _decimals: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMetadata(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      _metadata: IBluumNft.MetadataStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPrices(
      _collection: PromiseOrValue<string>,
      _prices: IDex.PriceStruct[],
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  accessManager(overrides?: CallOverrides): Promise<string>;

  addCollections(
    _collections: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addPaymentTokens(
    _collection: PromiseOrValue<string>,
    _tokens: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  buyNft(
    _paymentToken: PromiseOrValue<string>,
    _collection: PromiseOrValue<string>,
    _sku: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAvailableStatus(
    _collection: PromiseOrValue<string>,
    _skuIDs: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<boolean[]>;

  getNftsMetadata(
    _collection: PromiseOrValue<string>,
    _skuIDs: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<IBluumNft.MetadataStructOutput[]>;

  getPaymentTokenPrice(
    _collection: PromiseOrValue<string>,
    _sku: PromiseOrValue<BigNumberish>,
    _tokens: PromiseOrValue<string>[],
    overrides?: CallOverrides
  ): Promise<
    [BigNumber[], BigNumber[]] & {
      _prices: BigNumber[];
      _decimals: BigNumber[];
    }
  >;

  getPaymentTokens(
    _collection: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  initialize(
    _teamWallet: PromiseOrValue<string>,
    _accessManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  removeCollections(
    _collections: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removePaymentTokens(
    _collection: PromiseOrValue<string>,
    _tokens: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAvailableStatus(
    _collection: PromiseOrValue<string>,
    _skuIDs: PromiseOrValue<BigNumberish>[],
    _isAvailable: PromiseOrValue<boolean>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setDecimals(
    _tokens: PromiseOrValue<string>[],
    _decimals: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMetadata(
    _collection: PromiseOrValue<string>,
    _skuIDs: PromiseOrValue<BigNumberish>[],
    _metadata: IBluumNft.MetadataStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPrices(
    _collection: PromiseOrValue<string>,
    _prices: IDex.PriceStruct[],
    _skuIDs: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeTo(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    accessManager(overrides?: CallOverrides): Promise<string>;

    addCollections(
      _collections: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    addPaymentTokens(
      _collection: PromiseOrValue<string>,
      _tokens: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    buyNft(
      _paymentToken: PromiseOrValue<string>,
      _collection: PromiseOrValue<string>,
      _sku: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAvailableStatus(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<boolean[]>;

    getNftsMetadata(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<IBluumNft.MetadataStructOutput[]>;

    getPaymentTokenPrice(
      _collection: PromiseOrValue<string>,
      _sku: PromiseOrValue<BigNumberish>,
      _tokens: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber[], BigNumber[]] & {
        _prices: BigNumber[];
        _decimals: BigNumber[];
      }
    >;

    getPaymentTokens(
      _collection: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    initialize(
      _teamWallet: PromiseOrValue<string>,
      _accessManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    removeCollections(
      _collections: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    removePaymentTokens(
      _collection: PromiseOrValue<string>,
      _tokens: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setAvailableStatus(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      _isAvailable: PromiseOrValue<boolean>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setDecimals(
      _tokens: PromiseOrValue<string>[],
      _decimals: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setMetadata(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      _metadata: IBluumNft.MetadataStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    setPrices(
      _collection: PromiseOrValue<string>,
      _prices: IDex.PriceStruct[],
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AdminChanged(address,address)"(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;
    AdminChanged(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;

    "AvailableStatusSet(address,uint256,bool)"(
      collection?: PromiseOrValue<string> | null,
      sku?: PromiseOrValue<BigNumberish> | null,
      isAvailable?: null
    ): AvailableStatusSetEventFilter;
    AvailableStatusSet(
      collection?: PromiseOrValue<string> | null,
      sku?: PromiseOrValue<BigNumberish> | null,
      isAvailable?: null
    ): AvailableStatusSetEventFilter;

    "BeaconUpgraded(address)"(
      beacon?: PromiseOrValue<string> | null
    ): BeaconUpgradedEventFilter;
    BeaconUpgraded(
      beacon?: PromiseOrValue<string> | null
    ): BeaconUpgradedEventFilter;

    "CollectionAdded(address)"(collection?: null): CollectionAddedEventFilter;
    CollectionAdded(collection?: null): CollectionAddedEventFilter;

    "CollectionRemoved(address)"(
      collection?: null
    ): CollectionRemovedEventFilter;
    CollectionRemoved(collection?: null): CollectionRemovedEventFilter;

    "DecimalSet(address,uint256)"(
      paymentToken?: PromiseOrValue<string> | null,
      decimals?: null
    ): DecimalSetEventFilter;
    DecimalSet(
      paymentToken?: PromiseOrValue<string> | null,
      decimals?: null
    ): DecimalSetEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "MetadataSet(address,uint256,bytes,bytes32)"(
      collection?: PromiseOrValue<string> | null,
      sku?: PromiseOrValue<BigNumberish> | null,
      publicURI?: null,
      hashPrivateURI?: null
    ): MetadataSetEventFilter;
    MetadataSet(
      collection?: PromiseOrValue<string> | null,
      sku?: PromiseOrValue<BigNumberish> | null,
      publicURI?: null,
      hashPrivateURI?: null
    ): MetadataSetEventFilter;

    "NftBought(address,uint256,uint256,address,uint256,address)"(
      collection?: PromiseOrValue<string> | null,
      sku?: PromiseOrValue<BigNumberish> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      paymentToken?: null,
      price?: null,
      buyer?: null
    ): NftBoughtEventFilter;
    NftBought(
      collection?: PromiseOrValue<string> | null,
      sku?: PromiseOrValue<BigNumberish> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      paymentToken?: null,
      price?: null,
      buyer?: null
    ): NftBoughtEventFilter;

    "PaymentTokenAdded(address,address)"(
      collection?: PromiseOrValue<string> | null,
      paymentToken?: null
    ): PaymentTokenAddedEventFilter;
    PaymentTokenAdded(
      collection?: PromiseOrValue<string> | null,
      paymentToken?: null
    ): PaymentTokenAddedEventFilter;

    "PaymentTokenRemoved(address,address)"(
      collection?: PromiseOrValue<string> | null,
      paymentToken?: null
    ): PaymentTokenRemovedEventFilter;
    PaymentTokenRemoved(
      collection?: PromiseOrValue<string> | null,
      paymentToken?: null
    ): PaymentTokenRemovedEventFilter;

    "PriceSet(address,uint256,address,uint256)"(
      collection?: PromiseOrValue<string> | null,
      sku?: PromiseOrValue<BigNumberish> | null,
      paymentToken?: null,
      price?: null
    ): PriceSetEventFilter;
    PriceSet(
      collection?: PromiseOrValue<string> | null,
      sku?: PromiseOrValue<BigNumberish> | null,
      paymentToken?: null,
      price?: null
    ): PriceSetEventFilter;

    "Upgraded(address)"(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
    Upgraded(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
  };

  estimateGas: {
    accessManager(overrides?: CallOverrides): Promise<BigNumber>;

    addCollections(
      _collections: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addPaymentTokens(
      _collection: PromiseOrValue<string>,
      _tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    buyNft(
      _paymentToken: PromiseOrValue<string>,
      _collection: PromiseOrValue<string>,
      _sku: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAvailableStatus(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNftsMetadata(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPaymentTokenPrice(
      _collection: PromiseOrValue<string>,
      _sku: PromiseOrValue<BigNumberish>,
      _tokens: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPaymentTokens(
      _collection: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _teamWallet: PromiseOrValue<string>,
      _accessManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    removeCollections(
      _collections: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removePaymentTokens(
      _collection: PromiseOrValue<string>,
      _tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAvailableStatus(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      _isAvailable: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setDecimals(
      _tokens: PromiseOrValue<string>[],
      _decimals: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMetadata(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      _metadata: IBluumNft.MetadataStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPrices(
      _collection: PromiseOrValue<string>,
      _prices: IDex.PriceStruct[],
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    accessManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addCollections(
      _collections: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addPaymentTokens(
      _collection: PromiseOrValue<string>,
      _tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    buyNft(
      _paymentToken: PromiseOrValue<string>,
      _collection: PromiseOrValue<string>,
      _sku: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAvailableStatus(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNftsMetadata(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPaymentTokenPrice(
      _collection: PromiseOrValue<string>,
      _sku: PromiseOrValue<BigNumberish>,
      _tokens: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPaymentTokens(
      _collection: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _teamWallet: PromiseOrValue<string>,
      _accessManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeCollections(
      _collections: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removePaymentTokens(
      _collection: PromiseOrValue<string>,
      _tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAvailableStatus(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      _isAvailable: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setDecimals(
      _tokens: PromiseOrValue<string>[],
      _decimals: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMetadata(
      _collection: PromiseOrValue<string>,
      _skuIDs: PromiseOrValue<BigNumberish>[],
      _metadata: IBluumNft.MetadataStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPrices(
      _collection: PromiseOrValue<string>,
      _prices: IDex.PriceStruct[],
      _skuIDs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
