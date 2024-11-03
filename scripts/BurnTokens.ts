// npx ts-node --files ./scripts/BurnTokens.ts CONTRACT_ADDRESS AMOUNT NETWORK

import { createPublicClient, http, createWalletClient } from "viem";

import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia, sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const minterPrivateKey = process.env.PRIVATE_KEY || "";

function validateParameters(parameters: string[]) {
    if (!parameters || parameters.length < 3)
      throw new Error("Parameters not provided");
  
    const contractAddress = parameters[0] as `0x${string}`;
    if (!contractAddress) throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
      throw new Error("Invalid contract address");
  
    const amount = parameters[1];
    if (isNaN(Number(amount))) throw new Error("Invalid amount");
  
    const network = parameters[2];
    if (!network) throw new Error("Network not provided");
  
    return { contractAddress, amount, network };
  }

  async function main() {
    console.log("\n");
    const { contractAddress, amount, network } = validateParameters(process.argv.slice(2));
  
    const chain = network === "base" ? baseSepolia : sepolia;
    const subdomain = network === "base" ? "base-sepolia" : "eth-sepolia";
    const transport = http(`https://${subdomain}.g.alchemy.com/v2/${providerApiKey}`);
  
    const account = privateKeyToAccount(`0x${minterPrivateKey}`);
    const minter = createWalletClient({
      account,
      chain: chain,
      transport: transport,
    });
  
    console.log(`Burning ${amount} tokens from account: ${account.address}`);
    console.log("Confirm? (Y/n)");
  
    const stdin = process.stdin;
    stdin.on("data", async function (d) {
      if (d.toString().trim() == "Y") {
        const hash = await minter.writeContract({
          address: contractAddress,
          abi,
          functionName: "burn",
          args: [BigInt(amount)],
        });
        console.log("Transaction hash:", hash);
        console.log("Waiting for confirmations...");
        const publicClient = createPublicClient({
          chain: chain,
          transport: transport,
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        console.log(`Transaction confirmed: ${receipt.status}`);
        console.log(`Block: ${receipt.blockNumber}`)
      } else {
        console.log("Operation cancelled");
      }
      process.exit();
    });
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });