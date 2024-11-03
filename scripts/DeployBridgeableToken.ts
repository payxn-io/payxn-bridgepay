// npx ts-node --files ./scripts/DeployBridgeableToken.ts TOKEN_NAME TOKEN_SYMBOL NETWORK

import { createPublicClient, http, createWalletClient, formatEther } from "viem";

import { privateKeyToAccount } from "viem/accounts";
import { sepolia, baseSepolia } from "viem/chains";
import { abi, bytecode } from "../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

function validateParameters(parameters: string[]) {
    if (!parameters || parameters.length < 3)
      throw new Error("Parameters not provided");
  
    const tokenName = parameters[0];
    if (!tokenName) throw new Error("Token name not provided");
  
    const tokenSymbol = parameters[1];
    if (!tokenSymbol) throw new Error("Token symbol not provided");
  
    const network = parameters[2];
    if (!network) throw new Error("Network not provided");
  
    return { tokenName, tokenSymbol, network };
  }