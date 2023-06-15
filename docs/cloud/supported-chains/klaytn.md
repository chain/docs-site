---
description: Klaytn network in Chain Cloud RPC service
---

# Klaytn

**Klaytn** is a highly optimized, BFT-based public blockchain that aims to meet the enterprise-grade reliability. Key design goals are;

* Immediate finality.
* High TPS that meets real-world use cases.
* Lower the cost of running Blockchain Applications.
* Lower the barriers to entry for end-users.
* Ease the technology adoption process for industry.

### Quick links

****[**Klaytn**](https://klaytn.foundation/)****

****[**Docs**](https://docs.klaytn.foundation/)****

****[**Github**](https://github.com/klaytn)****

### Connect wallet

You can set up your **MetaMask wallet** to connect to Klaytn Chain RPC. You can then perform transactions and interact with the network.

#### Get started

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'.
3. Enter the settings for the required project as follows in the table below:

|    Chain     | Custom RPC Category |                                      Details                                       |
| :----------: | :-----------------: | :--------------------------------------------------------------------------------: |
| Klaytn Chain |    NETWORK NAME:    |                                  Klaytn Chain RPC                                  |
|              |    NEW RPC URL:     | [https://username.chainprtcl.net/klaytn/uid](https://username.chainprtcl.net/klaytn/uid) |
|              |      CHAIN ID:      |                                        8217                                        |
|              |       SYMBOL:       |                                        KLAY                                        |
|              |   BLOCK EXPLORER:   |                [https://scope.klaytn.com](https://scope.klaytn.com)                |

### Integrate Code

#### web3 library

* **clientVersion**

Returns the current client version.

**Example request**

```
curl https://username.chainprtcl.net/klaytn/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**

```
{"jsonrpc":"2.0","id":1,"result":"Klaytn/v1.10.1/linux-amd64/go1.15.7"}
```

#### net library

* **net\_version**

Returns the current network id.

**Example request**

```
curl https://username.chainprtcl.net/klaytn/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**

```
{"jsonrpc":"2.0","id":67,"result":"8217"}
```

#### eth library

#### Example request

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/klaytn/uid \
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
{"jsonrpc":"2.0","id":1,"result":"0x5208"}
```

### Pricing

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $728                 |
| Archive Node          | $1118                |
| Testnet               | $338                 |