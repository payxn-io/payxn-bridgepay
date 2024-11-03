// npx ts-node --files ./scripts/WatchForBridges.ts SOURCE_NETWORK SOURCE_TOKEN_ADDRESS DESTINATION_NETWORK DESTINATION_TOKEN_ADDRESS

import { createPublicClient, createWalletClient, http, parseAbiItem } from "viem";

import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia, sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const minterPrivateKey = process.env.PRIVATE_KEY || "";

function validateParameters(parameters: string[]) {
    if (!parameters || parameters.length < 4)
      throw new Error("Parameters not provided");
  
    const sourceNetwork = parameters[0];
    if (!sourceNetwork) throw new Error("Source network not provided");
  
    const sourceTokenAddress = parameters[1] as `0x${string}`;
    if (!sourceTokenAddress) throw new Error("Source contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(sourceTokenAddress))
      throw new Error("Invalid source contract address");
  
    const destinationNetwork = parameters[2];
    if (!destinationNetwork) throw new Error("Destination network not provided");
  
    const destinationTokenAddress = parameters[3] as `0x${string}`;
    if (!destinationTokenAddress) throw new Error("Destination contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(destinationTokenAddress))
      throw new Error("Invalid destination contract address");
  
    return { sourceTokenAddress, sourceNetwork, destinationTokenAddress, destinationNetwork };
  }