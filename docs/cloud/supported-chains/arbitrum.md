---
description: Arbitrum network in Chain Cloud RPC service
---

# Arbitrum

**Arbitrum** is a suite of Ethereum scaling solutions that enable high-throughput, low cost smart contracts while remaining trustlessly secure.

Arbitrum has three modes: **AnyTrust Channels**, **AnyTrust Sidechains,** and **Arbitrum Rollup**.

### **Quick Links**[​](https://www.ankr.com/docs/build-blockchain/chains/v2/arbitrum/#quick-links) <a href="#quick-links" id="quick-links"></a>

[**Arbitrum**](https://arbitrum.io/) ​

[**Docs**](https://developer.offchainlabs.com/docs/frontend\_integration)**​**

[**Github**](https://github.com/OffchainLabs)

### Connect wallet[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to Arbitrum RPC. You can then perform transactions and interact with the network.

### Get started[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#get-started) <a href="#get-started" id="get-started"></a>

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

|  Chain   | Custom RPC Category |                                        Details                                         |
| :------: | :-----------------: | :------------------------------------------------------------------------------------: |
| Arbitrum |    NETWORK NAME:    |                                      Arbitrum RPC                                      |
|          |    NEW RPC URL:     | [https://apigw-dev.chainprtcl.net/arbitrum](https://apigw-dev.chainprtcl.net/arbitrum) |
|          |      CHAIN ID:      |                                         42161                                          |
|          |       SYMBOL:       |                                          AETH                                          |
|          |   BLOCK EXPLORER:   |                       [https://arbiscan.io](https://arbiscan.io)                       |

### Integrate Code[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#gnosis-1) <a href="#gnosis-1" id="gnosis-1"></a>

#### web3 library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#web3-library) <a href="#web3-library" id="web3-library"></a>

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-request)

```
curl https://apigw-dev.chainprtcl.net/arbitrum \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-response)

```
{"jsonrpc":"2.0","result":"OpenEthereum//v3.3.0-rc.15-stable-88eb7d325-20211104/x86_64-linux-gnu/rustc1.48.0","id":1}
```

#### net library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#net-library) <a href="#net-library" id="net-library"></a>

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-request-1)

```
curl https://apigw-dev.chainprtcl.net/arbitrum \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-response-1)

```
{"jsonrpc":"2.0","result":"100","id":67}
```

#### eth library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#eth-library) <a href="#eth-library" id="eth-library"></a>

#### Example request[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-request-2) <a href="#example-request-2" id="example-request-2"></a>

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://apigw-dev.chainprtcl.net/arbitrum \
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

#### Example response[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-response-2) <a href="#example-response-2" id="example-response-2"></a>

```
{"jsonrpc":"2.0","result":"0x5208","id":1}
```