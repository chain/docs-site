---
description: BSC network in Chain Cloud RPC service
---

# BSC Network

**BNB Chain** is an EVM compatible chain designed to work alongside Binance Chain.

As well as EVM compatibility, BNB Chain adds smart contract functionality to the chain. The dual-chain architecture alongside Binance Chain enables the sending and receiving of BNB and BEP2 tokens cross-chain.

EVM-compatibility permits support for Ethereum tools and DApps.

### Quick links[​](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#quick-links) <input type="hidden" id="quick-links" />

[**BNB Chain**](https://www.binance.org/en/smartChain)

[**Docs**](https://docs.binance.org/smart-chain/guides/bsc-intro.html)

[**Github**](https://github.com/bnb-chain)

### Connect wallet[​](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#connect-wallet) <input type="hidden" id="connect-wallet" />

You can set up your **MetaMask wallet** to connect to BNB Chain RPC. You can then perform transactions and interact with the network.

#### Get started[​](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#get-started) <input type="hidden" id="get-started" />

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'.
3. Enter the settings for the required project as follows in the table below:

|   Chain   | Custom RPC Category |                                                        Details                                                         |
| :-------: | :-----------------: | :--------------------------------------------------------------------------------------------------------------------: |
| BNB Chain |    NETWORK NAME:    |                                                     BNB Chain RPC                                                      |
|           |    NEW RPC URL:     | [https://username.chainprtcl.net/bsc/uid](https://username.chainprtcl.net/bsc/uid)                                     |
|           |      CHAIN ID:      |                                                           56                                                           |
|           |       SYMBOL:       |                                                          BNB                                                           |
|           |   BLOCK EXPLORER:   |                                      [https://bscscan.com](https://bscscan.com/)                                       |

### Integrate code[​](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#integrate-code) <input type="hidden" id="integrate-code" />

#### web3 library[​](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#web3-library) <input type="hidden" id="web3-library" />

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#example-request)

```
curl https://username.chainprtcl.net/bsc/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#example-response)

```
{"jsonrpc":"2.0","id":1,"result":"Geth/v1.1.7-74f6b613/linux-amd64/go1.16.10"}
```

#### net library[​](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#net-library) <input type="hidden" id="net-library" />

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#example-request-1)

```
curl https://username.chainprtcl.net/bsc/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#example-response-1)

```
{"jsonrpc":"2.0","result":"100","id":67}
```

#### eth library[​](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#eth-library) <input type="hidden" id="eth-library" />

#### Example request[​](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#example-request-2) <input type="hidden" id="example-request-2" />

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/bsc/uid \
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

#### Example response[​](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#example-response-2) <input type="hidden" id="example-response-2" />

```
{"jsonrpc":"2.0","result":"0x5208","id":1}
```

### Pricing[​](https://docs.chain.com/docs/cloud/supported-chains/bsc-network/#pricing) <input type="hidden" id="pricing" />

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $1482                |