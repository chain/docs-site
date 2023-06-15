---
description: Polygon network in Chain Cloud RPC service
---

# Polygon

**Polygon** is a Layer 2 scaling solution that achieves scale by utilizing sidechains for off-chain computation and a decentralized network of Proof-of-Stake (PoS) validators.

### Quick links

****[**Polygon Chain**](https://polygon.technology/)****

****[**Docs**](https://wiki.polygon.technology/)****

[**Github**](https://github.com/maticnetwork/)

### Connect wallet

You can set up your **MetaMask wallet** to connect to Polygon RPC. You can then perform transactions and interact with the network.

### Get started

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

|  Chain  | Custom RPC Category |                                       Details                                        |
| :-----: | :-----------------: | :----------------------------------------------------------------------------------: |
| Polygon |    NETWORK NAME:    |                                     Polygon RPC                                      |
|         |    NEW RPC URL:     | [https://username.chainprtcl.net/polygon/uid](https://username.chainprtcl.net/polygon/uid) |
|         |      CHAIN ID:      |                                         137                                          |
|         |       SYMBOL:       |                                        MATIC                                         |
|         |   BLOCK EXPLORER:   |                 [https://polygonscan.com/](https://polygonscan.com/)                 |

### Integrate Code

#### web3 library

* **clientVersion**

Returns the current client version.

**Example request**

```
curl https://username.chainprtcl.net/polygon/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**

```
{"jsonrpc":"2.0","result":"OpenEthereum//v3.3.0-rc.15-stable-88eb7d325-20211104/x86_64-linux-gnu/rustc1.48.0","id":1}
```

#### net library

* **net\_version**

Returns the current network id.

**Example request**

```
curl https://username.chainprtcl.net/polygon/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**

```
{"jsonrpc":"2.0","result":"100","id":67}
```

#### eth library

#### Example request

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/polygon/uid \
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
{"jsonrpc":"2.0","result":"0x5208","id":1}
```

### Pricing

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $2132                |