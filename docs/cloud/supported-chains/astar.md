---
description: Astar network in Chain Cloud RPC service
---

# Astar

**Astar Network** is the future of smart contracts platform for multichain. The network supports the building of dApps with EVM and WASM smart contracts and offers developers true interoperability, with cross-consensus messaging (XCM). We are made by developers and for developers. Astar’s unique Build2Earn model empowers developers to get paid through a dApp staking mechanism for the code they write and dApps they build.

Astar Network focuses on making the best smart contract platform so that dApps developers on Polkadot do not need to pay much attention to infrastructure and can focus more on their dApp. Ideally, the developers can build whatever applications on Astar Network without having to consider its scalability. [Astar Network](https://astar.network/) solves prominent issues: scalability interoperability and lack of developer incentive.

### **Quick Links**[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#quick-links) <input type="hidden" id="quick-links" />

[**Astar**](https://astar.network/)

[**Docs**](https://docs.astar.network/)

[**Github**](https://github.com/AstarNetwork)

### Connect wallet[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#connect-wallet) <input type="hidden" id="connect-wallet" />

You can set up your **MetaMask wallet** to connect to Astar RPC. You can then perform transactions and interact with the network.

### Get started[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#get-started) <input type="hidden" id="get-started" />

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

| Chain | Custom RPC Category |                                    Details                                     |
| :---: | :-----------------: | :----------------------------------------------------------------------------: |
| Astar |    NETWORK NAME:    |                                   Astar RPC                                    |
|       |    NEW RPC URL:     | [https://username.chainprtcl.net/astar/uid](https://username.chainprtcl.net/astar/uid) |
|       |      CHAIN ID:      |                                      592                                       |
|       |       SYMBOL:       |                                      ASTR                                      |
|       |   BLOCK EXPLORER:   |         [https://astart.subscan.io](https://astart.subscan.io)                 |

### Integrate Code[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#gnosis-1) <input type="hidden" id="gnosis-1" />

#### web3 library[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#web3-library) <input type="hidden" id="web3-library" />

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-request)

```
curl https://username.chainprtcl.net/astar/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-response)

```
{"jsonrpc":"2.0","result":"astar/v23.0/fc-rpc-2.0.0-dev","id":1}
```

#### net library[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#net-library) <input type="hidden" id="net-library" />

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-request-1)

```
curl https://username.chainprtcl.net/astar/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-response-1)

```
{"jsonrpc":"2.0","result":"592","id":67}
```

#### eth library[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#eth-library) <input type="hidden" id="eth-library" />

#### Example request[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-request-2) <input type="hidden" id="example-request-2" />

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl username.chainprtcl.net/astar/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{
    "jsonrpc":"2.0",
    "method":"eth_estimateGas",
    "params":[{
    "from": "0x8D97689C9818892B700e27F316cc3E41e17fBeb9",
    "to": "0xd3CdA913deB6f67967B99D67aCDFa1712C293601",
    "value": "0x186a0"
    }],
    "id":1
}'
```

#### Example response[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-response-2) <input type="hidden" id="example-response-2" />

```
{"jsonrpc":"2.0","result":"0x5208","id":1}
```

### Pricing[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#pricing) <input type="hidden" id="pricing" />

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $190                 |
| Archive Node          | $255                 |
| Testnet               | $151                 |