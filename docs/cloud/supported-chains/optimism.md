---
description: Optimism network in Chain Cloud RPC service
---

# Optimism

**Optimism** is a Layer 2 scaling solution on Ethereum to reduce gas fees, process new transactions faster, thereby providing a smoother user experience while maintaining security from the Ethereum original chain. Optimism is an Optimistic Roll-up project, using a fraud-proof security mechanism.

### **Quick Links**

****[**Optimism**](https://www.optimism.io/)****

****[**Docs**](https://community.optimism.io/)**​**

****[**Github**](https://github.com/ethereum-optimism)****

### Connect wallet

You can set up your **MetaMask wallet** to connect to Optimism RPC. You can then perform transactions and interact with the network.

### Get started

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

|  Chain   | Custom RPC Category |                                  Details                                   |
| :------: | :-----------------: | :------------------------------------------------------------------------: |
| Optimism |    NETWORK NAME:    |                                Optimism RPC                                |
|          |    NEW RPC URL:     | [https://username.chainprtcl.net/op/uid](https://username.chainprtcl.net/op/uid) |
|          |      CHAIN ID:      |                                     10                                     |
|          |       SYMBOL:       |                                    ETH                                     |
|          |   BLOCK EXPLORER:   |    [https://optimistic.etherscan.io/](https://optimistic.etherscan.io/)    |

### Integrate Code

#### web3 library

* **clientVersion**

Returns the current client version.

**Example request**

```
curl https://username.chainprtcl.net/op/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**

```
{"jsonrpc":"2.0","id":1,"result":"Geth/v1.9.10-stable/linux-amd64/go1.18"}
```

#### net library

* **net\_version**

Returns the current network id.

**Example request**

```
curl https://username.chainprtcl.net/op/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**

```
{"jsonrpc":"2.0","id":67,"result":"10"}
```

#### eth library

#### Example request

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/op/uid \
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
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"gas required exceeds allowance (15000000)"}
```

### Pricing

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $190                 |
| Archive Node          | $515                 |
| Testnet               | $190                 |