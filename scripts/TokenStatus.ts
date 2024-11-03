// npx ts-node --files ./scripts/TokenStatus.ts CONTRACT_ADDRESS ACCOUNT_ADDRESS NETWORK

import { createPublicClient, http } from "viem";

import { baseSepolia, sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import * as dotenv from "dotenv";
dotenv.config();
