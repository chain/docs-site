---
description: Huobi ECO network in Chain Cloud RPC service
---

# Huobi ECO Chain

**Huobi HECO Chain** (Heco) is a decentralized, high-efficiency and energy-saving public chain. It is compatible with smart contracts and supports high- performance transactions. The endogenous token of Heco is HT and it adopts the HPoS consensus mechanism. Heco will continue to improve the efficiency of Ethereum by Layer2, which will supplement and empower the Ethereum ecosystem.

### **Quick Links**

[**Huabi ECO chain**](https://www.hecochain.com/en-us/)

[**Docs**](https://docs.hecochain.com/#/)

[**Github**](https://github.com/stars-labs/)

### Connect wallet

You can set up your **MetaMask wallet** to connect to HECO RPC. You can then perform transactions and interact with the network.

### Get started

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

| Chain | Custom RPC Category |                                    Details                                     |
| :---: | :-----------------: | :----------------------------------------------------------------------------: |
| HECO  |    NETWORK NAME:    |                                    HECO RPC                                    |
|       |    NEW RPC URL:     | [https://username.chainprtcl.net/heco/uid](https://username.chainprtcl.net/heco/uid) |
|       |      CHAIN ID:      |                                      128                                       |
|       |       SYMBOL:       |                                       HT                                       |
|       |   BLOCK EXPLORER:   |           [https://scan.hecochain.com/](https://scan.hecochain.com/)           |

### Integrate Code

#### web3 library

* **clientVersion**

Returns the current client version.

**Example request**

```
curl https://username.chainprtcl.net/heco/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**

```
{"jsonrpc":"2.0","id":1,"result":"Geth/v1.2.2-stable-b07a7152/linux-amd64/go1.17.3"}
```

#### net library

* **net\_version**

Returns the current network id.

**Example request**

```
curl https://username.chainprtcl.net/heco/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**

```
{"jsonrpc":"2.0","id":67,"result":"128"}
```

#### eth library

#### Example request

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/heco/uid \
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
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"err: insufficient funds for gas * price + value: address 0x8D97689C9818892B700e27F316cc3E41e17fBeb9 have 0 want 100000 (supplied gas 39960939)"}
```

### Pricing

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $533                 |
| Archive Node          | $923                 |
| Testnet               | $338                 |