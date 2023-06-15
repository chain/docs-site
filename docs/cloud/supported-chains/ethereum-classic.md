---
description: Ethereum Classic network in Chain Cloud RPC service
---

# Ethereum Classic

**Ethereum Classic** is a decentralized blockchain platform that lets anyone build and use decentralized applications that run on blockchain technology. Like Bitcoin, no one controls or owns Ethereum Classic – it is an open-source project built by people around the world. Unlike the Bitcoin protocol, Ethereum Classic was designed to be adaptable and flexible. It is easy to create new applications on the Ethereum Classic platform.

In 2014, Ethereum founders Vitalik Buterin, Gavin Wood and Jeffrey Wilcke began work on a next-generation blockchain that had the ambitions to implement a general, fully trustless smart contract platform.

### Quick links

****[**Ethereum Classic**](https://ethereumclassic.org/)

****[**Docs**](https://docs.ethereumclassic.org/)****

****[**Github**](https://github.com/etclabscore)****

### Connect wallet

You can set up your **MetaMask wallet** to connect to ETC RPC. You can then perform transactions and interact with the network.

### Get started

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

| Chain | Custom RPC Category |                                   Details                                    |
| :---: | :-----------------: | :--------------------------------------------------------------------------: |
|  ETC  |    NETWORK NAME:    |                                   ETC RPC                                    |
|       |    NEW RPC URL:     | [https://username.chainprtcl.net/etc/uid](https://username.chainprtcl.net/etc/uid) |
|       |      CHAIN ID:      |                                      61                                      |
|       |       SYMBOL:       |                                     ETC                                      |
|       |   BLOCK EXPLORER:   |  [https://blockscout.com/etc/mainnet/](https://blockscout.com/etc/mainnet/)  |

### Integrate Code

#### web3 library

* **clientVersion**

Returns the current client version.

**Example request**

```
curl https://username.chainprtcl.net/etc/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**

```
{
  "jsonrpc" : "2.0",
  "id" : 1,
  "result" : "besu/v22.10.3/linux-x86_64/openjdk-java-11"
}
```

#### net library

* **net\_version**

Returns the current network id.

**Example request**

```
curl https://username.chainprtcl.net/etc/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**

```
{
  "jsonrpc" : "2.0",
  "id" : 67,
  "result" : "1"
}
```

#### eth library

#### Example request

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/etc/uid \
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
{
  "jsonrpc" : "2.0",
  "id" : 1,
  "error" : {
    "code" : -32004,
    "message" : "Upfront cost exceeds account balance"
  }
}
```

### Pricing

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $213                 |