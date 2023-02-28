---
description: Aurora network in Chain Cloud RPC service
---

# Aurora

**Aurora** is an Ethereum Virtual Machine (EVM) built on the NEAR Protocol, that provides a solution for developers to deploy their apps on an Ethereum-compatible, high-throughput, scalable and future-safe platform, with low transaction costs for their users. Besides the EVM, Aurora developed the Rainbow Bridge which allows users to transfer assets between Ethereum, NEAR, and Aurora. Aurora is backed by top VCs such as Pantera Capital, Electric Capital, Dragonfly Capital, Three Arrows Capital, and Alameda Research.

### **Quick Links**[​](https://docs.chain.com/docs/cloud/supported-chains/aurora#quick-links) <a href="#quick-links" id="quick-links"></a>

****[**Aurora**](https://aurora.dev/)****

****[**Docs​**](https://doc.aurora.dev/)****

****[**Github**](https://github.com/AstarNetwork)****

### Connect wallet[​](https://docs.chain.com/docs/cloud/supported-chains/aurora/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to Aurora RPC. You can then perform transactions and interact with the network.

### Get started[​](https://docs.chain.com/docs/cloud/supported-chains/aurora/#get-started) <a href="#get-started" id="get-started"></a>

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

| Chain  | Custom RPC Category |                                      Details                                       |
| :----: | :-----------------: | :--------------------------------------------------------------------------------: |
| Aurora |    NETWORK NAME:    |                                     Aurora RPC                                     |
|        |    NEW RPC URL:     | [https://username.chainprtcl.net/aurora/uid](https://username.chainprtcl.net/aurora/uid) |
|        |      CHAIN ID:      |                                     1313161554                                     |
|        |       SYMBOL:       |                                        ETH                                         |
|        |   BLOCK EXPLORER:   |                 [https://aurorascan.dev/](https://aurorascan.dev/)                 |

### Integrate Code[​](https://docs.chain.com/docs/cloud/supported-chains/aurora/#gnosis-1) <a href="#gnosis-1" id="gnosis-1"></a>

#### web3 library[​](https://docs.chain.com/docs/cloud/supported-chains/aurora/#web3-library) <a href="#web3-library" id="web3-library"></a>

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/aurora/#example-request)

```
curl https://username.chainprtcl.net/aurora/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/aurora/#example-response)

```
{"jsonrpc":"2.0","id":1,"result":"Aurora-Relayer/0.0.0"}
```

#### net library[​](https://docs.chain.com/docs/cloud/supported-chains/aurora/#net-library) <a href="#net-library" id="net-library"></a>

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/aurora/#example-request-1)

```
curl https://username.chainprtcl.net/aurora/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/aurora/#example-response-1)

```
{"jsonrpc":"2.0","id":67,"result":"1313161554"}
```

#### eth library[​](https://docs.chain.com/docs/cloud/supported-chains/aurora/#eth-library) <a href="#eth-library" id="eth-library"></a>

#### Example request[​](https://docs.chain.com/docs/cloud/supported-chains/aurora/#example-request-2) <a href="#example-request-2" id="example-request-2"></a>

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/aurora/uid \
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

#### Example response[​](https://docs.chain.com/docs/cloud/supported-chains/aurora/#example-response-2) <a href="#example-response-2" id="example-response-2"></a>

```
{"jsonrpc":"2.0","id":1,"result":"0x6691b7"}
```

### Pricing[​](https://docs.chain.com/docs/cloud/supported-chains/aurora/#pricing) <a href="#pricing" id="pricing"></a>

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $312                 |
| Archive Node          | $1014                |
| Testnet               | $234                 |