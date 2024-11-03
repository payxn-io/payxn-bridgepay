"use client";

// import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BridgeTokens } from "~~/components/BridgeTokens";
import { TokenBalances } from "~~/components/TokenBalances";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

// import { WormholeConnect } from '@wormhole-foundation/wormhole-connect';

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            {/* <span className="block text-2xl mb-2">Welcome to</span> */}
            <span className="block text-4xl font-bold">BridgePay</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <TokenBalances />
          <BridgeTokens />
          {/* <WormholeConnect /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
