import { abi } from "../../../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useReadContracts, useWatchContractEvent } from "wagmi";

export const TokenBalances = () => {
  const { address: connectedAddress } = useAccount();
  // const tokenAddress = "0xa18f2e81f10a1a89151e99433434dd5a0a09f759";
  const tokenAddress1 = "0xa18f2e81f10a1a89151e99433434dd5a0a09f759";
  const tokenAddress2 = "0xdda5a1fcd29b7a765a3d8d4fc8cf4ee4fb0ec5be";
  const queryClient = useQueryClient();

  const result = useReadContracts({
    contracts: [
      {
        address: tokenAddress1,
        abi: abi,
        functionName: "balanceOf",
        args: [connectedAddress],
        chainId: 11155111,
      },
      {
        address: tokenAddress2,
        abi: abi,
        functionName: "balanceOf",
        args: [connectedAddress],
        chainId: 84532,
      },
    ],
  });
  const balanceSepolia = result.data?.[0].result;
  const balanceBase = result.data?.[1].result;
  const queryKey = result.queryKey;

  const useWatchContractEvents = (chainId: number) => {
    useWatchContractEvent({
      address: tokenAddress1,
      abi,
      chainId,
      onLogs(logs) {
        try {
          console.log("New logs!", logs);
          queryClient.invalidateQueries({ queryKey });
          console.log("Queries invalidated");
        } catch (error) {
          console.error("Error in onLogs function:", error);
        }
      },
    });
  };

  useWatchContractEvents(84532);
  useWatchContractEvents(11155111);

  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">USDC Token Balances</h2>

        {balanceSepolia !== undefined && (
          <div>ETH Sepolia $USDC Balance: {balanceSepolia ? balanceSepolia.toString() : 0}</div>
        )}
        {balanceBase !== undefined && <div>Base $USDC Balance: {balanceBase ? balanceBase.toString() : 0}</div>}
      </div>
    </div>
  );
};
