---
description: BSC network in Chain Cloud RPC service
---

# BSC Network

**BNB Chain** is an EVM compatible chain designed to work alongside Binance Chain.

As well as EVM compatibility, BNB Chain adds smart contract functionality to the chain. The dual-chain architecture alongside Binance Chain enables the sending and receiving of BNB and BEP2 tokens cross-chain.

EVM-compatibility permits support for Ethereum tools and DApps.

### Quick links[​](https://www.ankr.com/docs/build-blockchain/chains/v2/binance-smart-chain/#quick-links) <a href="#quick-links" id="quick-links"></a>

[**BNB Chain**](https://www.binance.org/en/smartChain)

[**Docs**](https://docs.binance.org/smart-chain/guides/bsc-intro.html)

[**Github**](https://github.com/bnb-chain)

### Connect wallet[​](https://www.ankr.com/docs/build-blockchain/chains/v2/binance-smart-chain/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to BNB Chain RPC. You can then perform transactions and interact with the network.

#### Get started[​](https://www.ankr.com/docs/build-blockchain/chains/v2/binance-smart-chain/#get-started) <a href="#get-started" id="get-started"></a>

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'.
3. Enter the settings for the required project as follows in the table below:

|   Chain   | Custom RPC Category |                                                        Details                                                         |
| :-------: | :-----------------: | :--------------------------------------------------------------------------------------------------------------------: |
| BNB Chain |    NETWORK NAME:    |                                                     BNB Chain RPC                                                      |
|           |    NEW RPC URL:     | [https://apigw-dev.chainprtcl.net/bsc](https://apigw-dev.chainprtcl.net/bsc)[&#xD;](https://api-us.chainprtcl.net/bsc) |
|           |      CHAIN ID:      |                                                           56                                                           |
|           |       SYMBOL:       |                                                          BNB                                                           |
|           |   BLOCK EXPLORER:   |                                      [https://bscscan.com](https://bscscan.com/)                                       |

### Integrate code[​](https://www.ankr.com/docs/build-blockchain/chains/v2/binance-smart-chain/#integrate-code) <a href="#integrate-code" id="integrate-code"></a>

#### web3 library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/binance-smart-chain/#web3-library) <a href="#web3-library" id="web3-library"></a>

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/binance-smart-chain/#example-request)

```
curl https://apigw-dev.chainprtcl.net/bsc \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/binance-smart-chain/#example-response)

```
{"jsonrpc":"2.0","id":1,"result":"Geth/v1.1.7-74f6b613/linux-amd64/go1.16.10"}
```

#### net library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/binance-smart-chain/#net-library) <a href="#net-library" id="net-library"></a>

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-request-1)

```
curl https://apigw-dev.chainprtcl.net/bsc \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-response-1)

```
{"jsonrpc":"2.0","result":"100","id":67}
```

#### eth library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/binance-smart-chain/#eth-library) <a href="#eth-library" id="eth-library"></a>

#### Example request[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-request-2) <a href="#example-request-2" id="example-request-2"></a>

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://apigw-dev.chainprtcl.net/bsc \
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