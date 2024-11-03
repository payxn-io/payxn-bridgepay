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

  async function main() {
    const { sourceTokenAddress, sourceNetwork, destinationTokenAddress, destinationNetwork } = validateParameters(process.argv.slice(2));
  
    console.log(`listening for bridges on ${sourceTokenAddress}...`);
  
    const sourceChain = sourceNetwork === "base" ? baseSepolia : sepolia;
    const sourceSubdomain = sourceNetwork === "base" ? "base-sepolia" : "eth-sepolia";
    const sourceTransport = http(`https://${sourceSubdomain}.g.alchemy.com/v2/${providerApiKey}`);
  
    const destinationChain = destinationNetwork === "base" ? baseSepolia : sepolia;
    const destinationSubdomain = destinationNetwork === "base" ? "base-sepolia" : "eth-sepolia";
    const destinationTransport = http(`https://${destinationSubdomain}.g.alchemy.com/v2/${providerApiKey}`);
  
    const publicClient = createPublicClient({
      chain: sourceChain,
      transport: sourceTransport,
    });
  
    const account = privateKeyToAccount(`0x${minterPrivateKey}`);
    const minter = createWalletClient({
      account,
      chain: destinationChain,
      transport: destinationTransport,
    });
  
    const eventAbi = parseAbiItem("event Bridge(address indexed owner, uint256 indexed amount)");
  
    publicClient.watchEvent({
      address: sourceTokenAddress,
      event: eventAbi,
      onLogs: logs => {
        logs.forEach(async log => {
          const { owner, amount } = log.args;
          console.log(`Bridge event detected:`);
          console.log(`Owner: ${owner}`);
          console.log(`Amount: ${amount} tokens`);
  
          const hash = await minter.writeContract({
            address: destinationTokenAddress,
            abi,
            functionName: "mint",
            args: [owner, amount],
          });
          console.log("Transaction hash:", hash);
          console.log("Waiting for confirmations...");
          const publicClient = createPublicClient({
            chain: destinationChain,
            transport: destinationTransport,
          });
          const receipt = await publicClient.waitForTransactionReceipt({ hash });
          console.log(`Transaction confirmed: ${receipt.status}`);
          console.log(`Block: ${receipt.blockNumber}`);
        });
      }
    });
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });