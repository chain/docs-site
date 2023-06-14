---
description: Optimism network in Chain Cloud RPC service
---

# Optimism

**Optimism** is a Layer 2 scaling solution on Ethereum to reduce gas fees, process new transactions faster, thereby providing a smoother user experience while maintaining security from the Ethereum original chain. Optimism is an Optimistic Roll-up project, using a fraud-proof security mechanism.

### **Quick Links**[​](https://docs.chain.com/docs/cloud/supported-chains/optimism/#quick-links) <input type="hidden" id="quick-links" />

****[**Optimism**](https://www.optimism.io/)****

****[**Docs**](https://community.optimism.io/)**​**

****[**Github**](https://github.com/ethereum-optimism)****

### Connect wallet[​](https://docs.chain.com/docs/cloud/supported-chains/optimism/#connect-wallet) <input type="hidden" id="connect-wallet" />

You can set up your **MetaMask wallet** to connect to Optimism RPC. You can then perform transactions and interact with the network.

### Get started[​](https://docs.chain.com/docs/cloud/supported-chains/optimism/#get-started) <input type="hidden" id="get-started" />

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

### Integrate Code[​](https://docs.chain.com/docs/cloud/supported-chains/optimism/#gnosis-1) <input type="hidden" id="gnosis-1" />

#### web3 library[​](https://docs.chain.com/docs/cloud/supported-chains/optimism/#web3-library) <input type="hidden" id="web3-library" />

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/optimism/#example-request)

```
curl https://username.chainprtcl.net/op/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/optimism/#example-response)

```
{"jsonrpc":"2.0","id":1,"result":"Geth/v1.9.10-stable/linux-amd64/go1.18"}
```

#### net library[​](https://docs.chain.com/docs/cloud/supported-chains/optimism/#net-library) <input type="hidden" id="net-library" />

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/optimism/#example-request-1)

```
curl https://username.chainprtcl.net/op/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/optimism/#example-response-1)

```
{"jsonrpc":"2.0","id":67,"result":"10"}
```

#### eth library[​](https://docs.chain.com/docs/cloud/supported-chains/optimism/#eth-library) <input type="hidden" id="eth-library" />

#### Example request[​](https://docs.chain.com/docs/cloud/supported-chains/optimism/#example-request-2) <input type="hidden" id="example-request-2" />

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

#### Example response[​](https://docs.chain.com/docs/cloud/supported-chains/optimism/#example-response-2) <input type="hidden" id="example-response-2" />

```
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"gas required exceeds allowance (15000000)"}
```

### Pricing[​](https://docs.chain.com/docs/cloud/supported-chains/optimism/#pricing) <input type="hidden" id="pricing" />

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $190                 |
| Archive Node          | $515                 |
| Testnet               | $190                 |