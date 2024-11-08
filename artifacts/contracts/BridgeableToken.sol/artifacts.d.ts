// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { BridgeableToken$Type } from "./BridgeableToken";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["BridgeableToken"]: BridgeableToken$Type;
    ["contracts/BridgeableToken.sol:BridgeableToken"]: BridgeableToken$Type;
  }

  interface ContractTypesMap {
    ["BridgeableToken"]: GetContractReturnType<BridgeableToken$Type["abi"]>;
    ["contracts/BridgeableToken.sol:BridgeableToken"]: GetContractReturnType<BridgeableToken$Type["abi"]>;
  }
}
