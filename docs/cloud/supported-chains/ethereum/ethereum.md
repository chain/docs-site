---
description: Overview of Ethereum Network
---

# Ethereum

**Ethereum** is a decentralized, open-source blockchain with smart contract functionality. **Ether** (**ETH**) is the native cryptocurrency of the platform.

The Ethereum network is one of the most popular platforms for building dApps and blockchain solutions. A series of upgrades are currently taking place as part of the transition from **Proof-of-Work** to a **Proof-of-Stake** consensus model. This shift allows network participants to stake ETH and earn rewards for supporting the network.

To connect to an Ethereum node, every Ethereum Client e.g. [Geth](https://geth.ethereum.org/) or [Erigon](https://github.com/ledgerwatch/erigon) implements a JSON-RPC specification. The [Ethereum JSON-RPC Specification](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json\&uiSchema%5BappBar%5D%5Bui:splitView%5D=true\&uiSchema%5BappBar%5D%5Bui:input%5D=false\&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false) is a collection of methods that all clients implement.

### Quick links[​](https://www.ankr.com/docs/build-blockchain/chains/v2/ethereum/about-ethereum/#quick-links) <a href="#quick-links" id="quick-links"></a>

​[**Ethereum**](https://ethereum.org/en/developers/)

[**Docs**](https://ethereum.org/en/developers/docs/apis/json-rpc/)

[**Github**](https://github.com/ethereum/eth1.0-apis)

***

### Connect wallet[​](https://www.ankr.com/docs/build-blockchain/chains/v2/ethereum/about-ethereum/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to Ethereum RPC. You can then perform transactions and interact with the network.

**Example request - web3\_clientVersion**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/ethereum/about-ethereum/#example-request---web3\_clientversion)

This request gets the Client version being used.

```
curl https://api-us.chainprtcl.net/eth \  -X POST \  -H "Content-Type: application/json" \  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
```

**Example response - Geth Client version**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/ethereum/about-ethereum/#example-response---geth-client-version)

The response shows Geth Client v1.1.7-74 is used.

```
{"jsonrpc":"2.0","id":1,"result":"Geth/v1.1.7-74f6b613/linux-amd64/go1.16.10"}
```



#### Example request - Uses eth\_ to request the latest block number[​](https://www.ankr.com/docs/build-blockchain/chains/v2/ethereum/about-ethereum/#example-request---uses-eth\_-to-request-the-latest-block-number) <a href="#example-request---uses-eth_-to-request-the-latest-block-number" id="example-request---uses-eth_-to-request-the-latest-block-number"></a>

```
curl https://api-us.chainprtcl.net/eth \  -X POST \  -H "Content-Type: application/json" \  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":67}'
```

#### Example response[​](https://www.ankr.com/docs/build-blockchain/chains/v2/ethereum/about-ethereum/#example-response) <a href="#example-response" id="example-response"></a>

The latest block number is returned in hex

```
{"jsonrpc":"2.0","id":67,"result":"0xdb85e4"}
```