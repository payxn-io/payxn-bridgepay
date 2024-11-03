// npx ts-node --files ./scripts/MintTokens.ts CONTRACT_ADDRESS TO_ADDRESS AMOUNT NETWORK

import { createPublicClient, http, createWalletClient } from "viem";

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
  
    const contractAddress = parameters[0] as `0x${string}`;
    if (!contractAddress) throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
      throw new Error("Invalid contract address");
  
    const toAddress = parameters[1] as `0x${string}`;
    if (!toAddress) throw new Error("To address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(toAddress))
      throw new Error("Invalid to address");
  
    const amount = parameters[2];
    if (isNaN(Number(amount))) throw new Error("Invalid amount");
  
    const network = parameters[3];
    if (!network) throw new Error("Network not provided");
  
    return { contractAddress, toAddress, amount, network };
  }