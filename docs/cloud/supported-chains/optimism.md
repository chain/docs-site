---
description: Optimism network in Chain Cloud RPC service
---

# Optimism

**Optimism** is a Layer 2 scaling solution on Ethereum to reduce gas fees, process new transactions faster, thereby providing a smoother user experience while maintaining security from the Ethereum original chain. Optimism is an Optimistic Roll-up project, using a fraud-proof security mechanism.

### **Quick Links**[​](https://www.ankr.com/docs/build-blockchain/chains/v2/arbitrum/#quick-links) <a href="#quick-links" id="quick-links"></a>

****[**Optimism**](https://www.optimism.io/)****

****[**Docs**](https://community.optimism.io/)**​**

****[**Github**](https://github.com/ethereum-optimism)****

### Connect wallet[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to Optimism RPC. You can then perform transactions and interact with the network.

### Get started[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#get-started) <a href="#get-started" id="get-started"></a>

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

|  Chain   | Custom RPC Category |                                  Details                                   |
| :------: | :-----------------: | :------------------------------------------------------------------------: |
| Optimism |    NETWORK NAME:    |                                Optimism RPC                                |
|          |    NEW RPC URL:     | [https://apigw-dev.chainprtcl.net/op](https://apigw-dev.chainprtcl.net/op) |
|          |      CHAIN ID:      |                                     10                                     |
|          |       SYMBOL:       |                                    ETH                                     |
|          |   BLOCK EXPLORER:   |    [https://optimistic.etherscan.io/](https://optimistic.etherscan.io/)    |

### Integrate Code[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#gnosis-1) <a href="#gnosis-1" id="gnosis-1"></a>

#### web3 library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#web3-library) <a href="#web3-library" id="web3-library"></a>

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-request)

{% code overflow="wrap" %}
```
curl https://apigw-dev.chainprtcl.net/op \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```
{% endcode %}

**Example response**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-response)

{% code overflow="wrap" %}
```
{"jsonrpc":"2.0","result":"OpenEthereum//v3.3.0-rc.15-stable-88eb7d325-20211104/x86_64-linux-gnu/rustc1.48.0","id":1}
```
{% endcode %}

#### net library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#net-library) <a href="#net-library" id="net-library"></a>

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-request-1)

{% code overflow="wrap" %}
```
curl https://apigw-dev.chainprtcl.net/op \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```
{% endcode %}

**Example response**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-response-1)

```
{"jsonrpc":"2.0","result":"100","id":67}
```

#### eth library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#eth-library) <a href="#eth-library" id="eth-library"></a>

#### Example request[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-request-2) <a href="#example-request-2" id="example-request-2"></a>

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

{% code overflow="wrap" %}
```
curl https://apigw-dev.chainprtcl.net/op \
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
{% endcode %}

#### Example response[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-response-2) <a href="#example-response-2" id="example-response-2"></a>

```
{"jsonrpc":"2.0","result":"0x5208","id":1}
```