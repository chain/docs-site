---
description: Gnosis network in Chain Cloud RPC service
---

# Gnosis

**Gnosis Chain** (Formerly the xDai Chain) provides stability, scalability and an extendable beacon chain framework.

Development on Gnosis Chain is straightforward for Ethereum developers as it is an EVM compatible chain. Smart contracts can be written and deployed in the same way as for Ethereum just by setting a different RPC endpoint.

Any contract that works on the Ethereum mainnet can be redeployed to the Gnosis chain. Transaction costs are minimized, and all fees and transactions are paid with a single token (xDai). Many tools supporting Ethereum development are compatible with Gnosis Chain.

### Quick links[​](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#quick-links) <a href="#quick-links" id="quick-links"></a>

[**Gnosis Chain**](https://www.xdaichain.com/)

[**Docs**](https://www.xdaichain.com/)

[**Github**](https://github.com/xdaichain)

### Connect wallet[​](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to Gnosis RPC. You can then perform transactions and interact with the network.

### Get started[​](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#get-started) <a href="#get-started" id="get-started"></a>

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

| Chain  | Custom RPC Category |                                         Details                                         |
| :----: | :-----------------: | :-------------------------------------------------------------------------------------: |
| Gnosis |    NETWORK NAME:    |                                       Gnosis RPC                                        |
|        |    NEW RPC URL:     | [https://apigw-dev.chainprtcl.net/gnosis](https://apigw-dev.chainprtcl.net/gnosis)&#xD; |
|        |      CHAIN ID:      |                                          0x64                                           |
|        |       SYMBOL:       |                                          xDai                                           |
|        |   BLOCK EXPLORER:   |      [https://blockscout.com/xdai/mainnet/](https://blockscout.com/xdai/mainnet/)       |

### Integrate Code[​](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#gnosis-1) <a href="#gnosis-1" id="gnosis-1"></a>

#### web3 library[​](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#web3-library) <a href="#web3-library" id="web3-library"></a>

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#example-request)

```
curl https://apigw-dev.chainprtcl.net/gnosis \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#example-response)

```
{"jsonrpc":"2.0","result":"OpenEthereum//v3.3.0-rc.15-stable-88eb7d325-20211104/x86_64-linux-gnu/rustc1.48.0","id":1}
```

#### net library[​](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#net-library) <a href="#net-library" id="net-library"></a>

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#example-request-1)

```
curl https://apigw-dev.chainprtcl.net/gnosis \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#example-response-1)

```
{"jsonrpc":"2.0","result":"100","id":67}
```

#### eth library[​](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#eth-library) <a href="#eth-library" id="eth-library"></a>

#### Example request[​](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#example-request-2) <a href="#example-request-2" id="example-request-2"></a>

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://apigw-dev.chainprtcl.net/gnosis \
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

#### Example response[​](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#example-response-2) <a href="#example-response-2" id="example-response-2"></a>

```
{"jsonrpc":"2.0","result":"0x5208","id":1}
```

### Pricing[​](https://docs.chain.com/docs/cloud/supported-chains/gnosis/#pricing) <a href="#pricing" id="pricing"></a>

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $169                 |
| Archive Node          | $624                 |
| Testnet               | $169                 |