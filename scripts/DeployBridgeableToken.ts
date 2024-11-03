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

  async function main() {
    const { tokenName, tokenSymbol, network } = validateParameters(process.argv.slice(2));
  
    const chain = network === "base" ? baseSepolia : sepolia;
    const subdomain = network === "base" ? "base-sepolia" : "eth-sepolia";
    const transport = http(`https://${subdomain}.g.alchemy.com/v2/${providerApiKey}`);
  
    const publicClient = createPublicClient({
      chain: chain,
      transport: transport,
    });
    const blockNumber = await publicClient.getBlockNumber();
    console.log("Last block number:", blockNumber);
  
    const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
    const deployer = createWalletClient({
      account,
      chain: chain,
      transport: transport,
    });
    console.log("Deployer address:", deployer.account.address);
    const balance = await publicClient.getBalance({
      address: deployer.account.address,
    });
    console.log(
      "Deployer balance:",
      formatEther(balance),
      deployer.chain.nativeCurrency.symbol
    );
  
    console.log("\nDeploying BridgeableToken contract");
    const hash = await deployer.deployContract({
      abi,
      bytecode: bytecode as `0x${string}`,
      args: [tokenName, tokenSymbol],
    });
    console.log("Transaction hash:", hash);
    console.log("Waiting for confirmations...");
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    const contractAddress = receipt.contractAddress;
    console.log("BridgeableToken contract deployed to:", contractAddress);
  
    process.exit();
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });