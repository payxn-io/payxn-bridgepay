// npx ts-node --files ./scripts/TokenStatus.ts CONTRACT_ADDRESS ACCOUNT_ADDRESS NETWORK

import { createPublicClient, http } from "viem";

import { baseSepolia, sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";

function validateParameters(parameters: string[]) {
    if (!parameters || parameters.length < 3)
      throw new Error("Parameters not provided");
  
    const contractAddress = parameters[0] as `0x${string}`;
    if (!contractAddress) throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
      throw new Error("Invalid contract address");
  
    const accountAddress = parameters[1] as `0x${string}`;
    if (!accountAddress) throw new Error("Account address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(accountAddress))
      throw new Error("Invalid account address");
  
    const network = parameters[2];
    if (!network) throw new Error("Network not provided");
  
    return { contractAddress, accountAddress, network };
  }
  