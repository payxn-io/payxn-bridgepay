// npx ts-node --files ./scripts/BridgeTokens.ts CONTRACT_ADDRESS AMOUNT NETWORK

import { createPublicClient, http, createWalletClient } from "viem";

import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia, sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import * as dotenv from "dotenv";
dotenv.config();