---
description: Astar network in Chain Cloud RPC service
---

# Astar

**Astar Network** is the future of smart contracts platform for multichain. The network supports the building of dApps with EVM and WASM smart contracts and offers developers true interoperability, with cross-consensus messaging (XCM). We are made by developers and for developers. Astar’s unique Build2Earn model empowers developers to get paid through a dApp staking mechanism for the code they write and dApps they build.

Astar Network focuses on making the best smart contract platform so that dApps developers on Polkadot do not need to pay much attention to infrastructure and can focus more on their dApp. Ideally, the developers can build whatever applications on Astar Network without having to consider its scalability. [Astar Network](https://astar.network/) solves prominent issues: scalability interoperability and lack of developer incentive.

### **Quick Links**[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#quick-links) <a href="#quick-links" id="quick-links"></a>

[**Astar**](https://astar.network/)

[**Docs**](https://docs.astar.network/)

[**Github**](https://github.com/AstarNetwork)

### Connect wallet[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to Astar RPC. You can then perform transactions and interact with the network.

### Get started[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#get-started) <a href="#get-started" id="get-started"></a>

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

| Chain | Custom RPC Category |                                    Details                                     |
| :---: | :-----------------: | :----------------------------------------------------------------------------: |
| Astar |    NETWORK NAME:    |                                   Astar RPC                                    |
|       |    NEW RPC URL:     | [https://apigw-dev.chainprtcl.net/astr](https://apigw-dev.chainprtcl.net/astr) |
|       |      CHAIN ID:      |                                      592                                       |
|       |       SYMBOL:       |                                      ASTR                                      |
|       |   BLOCK EXPLORER:   |         [https://blockscout.com/astar/](https://blockscout.com/astar/)         |

### Integrate Code[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#gnosis-1) <a href="#gnosis-1" id="gnosis-1"></a>

#### web3 library[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#web3-library) <a href="#web3-library" id="web3-library"></a>

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-request)

```
curl https://apigw-dev.chainprtcl.net/astr \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-response)

```
{"jsonrpc":"2.0","result":"OpenEthereum//v3.3.0-rc.15-stable-88eb7d325-20211104/x86_64-linux-gnu/rustc1.48.0","id":1}
```

#### net library[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#net-library) <a href="#net-library" id="net-library"></a>

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-request-1)

```
curl https://apigw-dev.chainprtcl.net/astr \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-response-1)

```
{"jsonrpc":"2.0","result":"100","id":67}
```

#### eth library[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#eth-library) <a href="#eth-library" id="eth-library"></a>

#### Example request[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-request-2) <a href="#example-request-2" id="example-request-2"></a>

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://apigw-dev.chainprtcl.net/astr \
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

#### Example response[​](https://docs.chain.com/docs/cloud/supported-chains/astar/#example-response-2) <a href="#example-response-2" id="example-response-2"></a>

```
{"jsonrpc":"2.0","result":"0x5208","id":1}
```