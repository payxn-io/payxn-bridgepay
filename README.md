# Bridgepay
```
Enables payment of USDC on one chain to another. 
```
![Bridgepay-demo](https://github.com/user-attachments/assets/5eac8592-4b68-429f-9fe9-4547cefe3a0e)

### To do list
- [x] Create a fresh new dapp using Scaffold ETH 2 as a base
- [x] Update package and use viem to deploy scripts
- [x] Create contracts directory and build BridgeableToken.sol
- [x] Add .env, hardhatconfig.ts, tsconfig.json
- [x] Create scripts directory
- [x] Create DeployBridgeableToken.ts, MintTokens.ts, BridgeTokens.ts scripts, etc
- [x] Deploy token to Sepolia testnets
- [x] Mint tokens on Sepolia testnets
- [ ] Check token status
- [x] Watch for bridges on Sepolia testnets
- [x] Bridge tokens from Sepolia
- [x] Add frontend to show tokens in Sepolia
- [x] Add frontend to bridge tokens from Sepolia
- [ ] Deploy

### Getting started
- [ ] Compile the contract first
```
cd payxn-bridgepay
npx hardhat compile
```
𝘵𝘩𝘪𝘴 𝘸𝘪𝘭𝘭 𝘨𝘦𝘯𝘦𝘳𝘢𝘵𝘦 𝘵𝘩𝘦 𝘢𝘳𝘵𝘪𝘧𝘢𝘤𝘵𝘴 𝘧𝘰𝘭𝘥𝘦𝘳 𝘵𝘩𝘢𝘵 𝘺𝘰𝘶 𝘤𝘢𝘯 𝘤𝘢𝘭𝘭 𝘪𝘯 𝘺𝘰𝘶𝘳 𝘴𝘤𝘳𝘪𝘱𝘵𝘴 𝘪𝘦:
import { abi } from "../../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";

- [ ] Modify hardhat.config.ts and add etherscan api and sourcify 
- [ ] Add arguments.js to verify contract 
```
npx hardhat verify --constructor-args arguments.js --network sepolia TOKEN_ADDRESS
npx hardhat verify --constructor-args arguments.js --network sepolia 0xa18f2e81f10a1a89151e99433434dd5a0a09f759
```

### Deployed contracts

<img width="620" alt="Screenshot 2024-11-02 at 10 20 09 PM" src="https://github.com/user-attachments/assets/d0952ece-82b3-4f8d-957e-33f6546b9639">

<img width="626" alt="Screenshot 2024-11-03 at 2 21 40 AM" src="https://github.com/user-attachments/assets/002517e8-b5da-40ee-b09e-e50f436bc243">

### Listening for Bridges
<img width="636" alt="Screenshot 2024-11-03 at 3 13 24 AM" src="https://github.com/user-attachments/assets/bfb2d33c-3119-4e8f-b61c-463ec7e9acaa">

<img width="609" alt="Screenshot 2024-11-03 at 3 12 23 AM" src="https://github.com/user-attachments/assets/33fcad68-c0f8-4974-9f10-207519f6267d">

### Executing BridgeTokens
<img width="667" alt="Screenshot 2024-11-03 at 3 45 38 AM" src="https://github.com/user-attachments/assets/4f8a3661-3534-42ca-9dd6-ba13b073b9ae">


## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

**What's next**:

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`
- Edit your smart contract test in: `packages/hardhat/test`. To run test use `yarn hardhat:test`
- You can add your Alchemy API Key in `scaffold.config.ts` if you want more reliability in your RPC requests.

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
