---
description: Arbitrum network in Chain Cloud RPC service
---

# Arbitrum

**Arbitrum** is a suite of Ethereum scaling solutions that enable high-throughput, low cost smart contracts while remaining trustlessly secure.

Arbitrum has three modes: **AnyTrust Channels**, **AnyTrust Sidechains,** and **Arbitrum Rollup**.

### Quick Links

[**Arbitrum**](https://arbitrum.io/) ​

[**Docs**](https://developer.arbitrum.io/getting-started-devs)**​**

[**Github**](https://github.com/OffchainLabs)

### Connect wallet

You can set up your **MetaMask wallet** to connect to Arbitrum RPC. You can then perform transactions and interact with the network.

### Get started

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

|  Chain   | Custom RPC Category |                                        Details                                         |
| :------: | :-----------------: | :------------------------------------------------------------------------------------: |
| Arbitrum |    NETWORK NAME:    |                                      Arbitrum RPC                                      |
|          |    NEW RPC URL:     | [https://username.chainprtcl.net/arbitrum/uid](https://username.chainprtcl.net/arbitrum/uid) |
|          |      CHAIN ID:      |                                         42161                                          |
|          |       SYMBOL:       |                                          AETH                                          |
|          |   BLOCK EXPLORER:   |                       [https://arbiscan.io](https://arbiscan.io)                       |

### Integrate Code

#### web3 library

* **clientVersion**

Returns the current client version.

**Example request**

```
curl https://username.chainprtcl.net/arbitrum/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**

```
{"jsonrpc":"2.0","id":1,"result":"nitro/vv2.0.10-73224e3/linux-amd64/go1.19.5"}
```

#### net library

* **net\_version**

Returns the current network id.

**Example request**

```
curl https://username.chainprtcl.net/arbitrum/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**

```
{"jsonrpc":"2.0","id":67,"result":"42161"}
```

#### eth library

#### Example request

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/arbitrum/uid \
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
| Fullnode              | $182                 |
