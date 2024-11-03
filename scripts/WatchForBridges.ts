// npx ts-node --files ./scripts/WatchForBridges.ts SOURCE_NETWORK SOURCE_TOKEN_ADDRESS DESTINATION_NETWORK DESTINATION_TOKEN_ADDRESS

import { createPublicClient, createWalletClient, http, parseAbiItem } from "viem";

import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia, sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const minterPrivateKey = process.env.PRIVATE_KEY || "";
