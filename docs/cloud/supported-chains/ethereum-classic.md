---
description: Ethereum Classic network in Chain Cloud RPC service
---

# Ethereum Classic

**Ethereum Classic** is a decentralized blockchain platform that lets anyone build and use decentralized applications that run on blockchain technology. Like Bitcoin, no one controls or owns Ethereum Classic – it is an open-source project built by people around the world. Unlike the Bitcoin protocol, Ethereum Classic was designed to be adaptable and flexible. It is easy to create new applications on the Ethereum Classic platform.

In 2014, Ethereum founders Vitalik Buterin, Gavin Wood and Jeffrey Wilcke began work on a next-generation blockchain that had the ambitions to implement a general, fully trustless smart contract platform.

### Quick links[​](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#quick-links) <input type="hidden" id="quick-links" />

****[**Ethereum Classic**](https://ethereumclassic.org/)

****[**Docs**](https://docs.ethereumclassic.org/)****

****[**Github**](https://github.com/etclabscore)****

### Connect wallet[​](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#connect-wallet) <input type="hidden" id="connect-wallet" />

You can set up your **MetaMask wallet** to connect to ETC RPC. You can then perform transactions and interact with the network.

### Get started[​](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#get-started) <input type="hidden" id="get-started" />

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

### Integrate Code[​](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#integrate-code) <input type="hidden" id="integrate-code" />

#### web3 library[​](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#web3-library) <input type="hidden" id="web3-library" />

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#example-request)

```
curl https://username.chainprtcl.net/etc/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#example-response)

```
{
  "jsonrpc" : "2.0",
  "id" : 1,
  "result" : "besu/v22.10.3/linux-x86_64/openjdk-java-11"
}
```

#### net library[​](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#net-library) <input type="hidden" id="net-library" />

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#example-request-1)

```
curl https://username.chainprtcl.net/etc/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#example-response-1)

```
{
  "jsonrpc" : "2.0",
  "id" : 67,
  "result" : "1"
}
```

#### eth library[​](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#eth-library) <input type="hidden" id="eth-library" />

#### Example request[​](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#example-request-2) <input type="hidden" id="example-request-2" />

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

#### Example response[​](https://docs.chain.com/docs/cloud/supported-chains/ethereum-classic/#example-response-2) <input type="hidden" id="example-response-2" />

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

### Pricing[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#pricing) <input type="hidden" id="pricing" />

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $213                 |