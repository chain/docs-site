---
description: Aurora network in Chain Cloud RPC service
---

# Aurora

**Aurora** is an Ethereum Virtual Machine (EVM) built on the NEAR Protocol, that provides a solution for developers to deploy their apps on an Ethereum-compatible, high-throughput, scalable and future-safe platform, with low transaction costs for their users. Besides the EVM, Aurora developed the Rainbow Bridge which allows users to transfer assets between Ethereum, NEAR, and Aurora. Aurora is backed by top VCs such as Pantera Capital, Electric Capital, Dragonfly Capital, Three Arrows Capital, and Alameda Research.

### **Quick Links**

****[**Aurora**](https://aurora.dev/)****

****[**Docs​**](https://doc.aurora.dev/)****

****[**Github**](https://github.com/AstarNetwork)****

### Connect wallet

You can set up your **MetaMask wallet** to connect to Aurora RPC. You can then perform transactions and interact with the network.

### Get started

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

### Integrate Code

#### web3 library

* **clientVersion**

Returns the current client version.

**Example request**

```
curl https://username.chainprtcl.net/aurora/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**

```
{"jsonrpc":"2.0","id":1,"result":"Aurora-Relayer/0.0.0"}
```

#### net library

* **net\_version**

Returns the current network id.

**Example request**

```
curl https://username.chainprtcl.net/aurora/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**

```
{"jsonrpc":"2.0","id":67,"result":"1313161554"}
```

#### eth library

#### Example request

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

#### Example response

```
{"jsonrpc":"2.0","id":1,"result":"0x6691b7"}
```

### Pricing

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $312                 |
| Archive Node          | $1014                |
| Testnet               | $234                 |