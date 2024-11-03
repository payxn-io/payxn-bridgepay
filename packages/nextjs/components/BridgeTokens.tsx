import { useState } from "react";
import { abi } from "../../../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import { useChainId, useWatchContractEvent, useWriteContract } from "wagmi";

export const BridgeTokens = () => {
  const [amount, setAmount] = useState(1);
  const [destinationTransactionHash, setDestinationTransactionHash] = useState("");
  const tokenAddress = "0xD19e8d3a9720df22F6689EB9B54C691414efE8C2";

  const { data, isError, error, isPending, isSuccess, writeContract } = useWriteContract();
  const chainId = useChainId();

  const getSourceChainName = (id: number) => {
    switch (id) {
      case 84532:
        return "Base Sepolia";
      case 11155111:
        return "Sepolia Testnet";
    }
  };

  const getTargetChainName = (id: number) => {
    switch (id) {
      case 84532:
        return "Sepolia Testnet";
      case 11155111:
        return "Base Sepolia";
    }
  };

  const getChainExplorer = (id: number) => {
    switch (id) {
      case 84532:
        return "https://sepolia.basescan.org";
      case 11155111:
        return "https://sepolia.etherscan.io";
    }
  };

  const destinationChainId = chainId === 84532 ? 11155111 : 84532;

  useWatchContractEvent({
    address: tokenAddress,
    abi,
    chainId: destinationChainId,
    onLogs(logs) {
      try {
        console.log("New logs! BridgeTokens", logs);
        setDestinationTransactionHash(logs[0].transactionHash ?? "");
        console.log("destinationTransactionHash", destinationTransactionHash);
      } catch (error) {
        console.error("Error in onLogs function:", error);
      }
    },
  });

  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Bridge Tokens</h2>

        {chainId && <p>{`${getSourceChainName(chainId)} → ${getTargetChainName(chainId)}`}</p>}

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter the amount to bridge:</span>
          </label>
          <input
            type="text"
            placeholder="2"
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />
        </div>

        <button
          className="btn btn-active btn-neutral"
          disabled={isPending}
          onClick={() => {
            setDestinationTransactionHash("");
            writeContract({
              abi: abi,
              address: tokenAddress,
              functionName: "bridge",
              args: [BigInt(amount)],
            });
          }}
        >
          Bridge
        </button>
        {isSuccess && (
          <>
            <div>
              Source tx hash:{" "}
              <a href={`${getChainExplorer(chainId)}/tx/${data}`} target="_blank">
                {data ? `${data.slice(0, 7)}...${data.slice(-5)}` : ""}
              </a>
            </div>
            <div>
              Destination tx hash:{" "}
              <a href={`${getChainExplorer(destinationChainId)}/tx/${destinationTransactionHash}`} target="_blank">
                {destinationTransactionHash
                  ? `${destinationTransactionHash.slice(0, 7)}...${destinationTransactionHash.slice(-5)}`
                  : ""}
              </a>
            </div>
          </>
        )}
        {isError && <div>Error bridging: {error.message}</div>}
      </div>
    </div>
  );
};
