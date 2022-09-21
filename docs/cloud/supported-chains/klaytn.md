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

### Quick links[​](https://www.ankr.com/docs/build-blockchain/chains/v2/solana/#quick-links) <a href="#quick-links" id="quick-links"></a>

****[**Klaytn**](https://klaytn.foundation/)****

****[**Docs**](https://docs.klaytn.foundation/)****

****[**Github**](https://github.com/klaytn)****

### Connect wallet[​](https://www.ankr.com/docs/build-blockchain/chains/v2/solana/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to Klaytn Chain RPC. You can then perform transactions and interact with the network.

#### Get started[​](https://www.ankr.com/docs/build-blockchain/chains/v2/binance-smart-chain/#get-started) <a href="#get-started" id="get-started"></a>

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'.
3. Enter the settings for the required project as follows in the table below:

|    Chain     | Custom RPC Category |                                      Details                                       |
| :----------: | :-----------------: | :--------------------------------------------------------------------------------: |
| Klaytn Chain |    NETWORK NAME:    |                                  Klaytn Chain RPC                                  |
|              |    NEW RPC URL:     | [https://apigw-dev.chainprtcl.net/klaytn](https://apigw-dev.chainprtcl.net/klaytn) |
|              |      CHAIN ID:      |                                        8217                                        |
|              |       SYMBOL:       |                                        KLAY                                        |
|              |   BLOCK EXPLORER:   |                [https://scope.klaytn.com](https://scope.klaytn.com)                |

### Integrate Code[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#gnosis-1) <a href="#gnosis-1" id="gnosis-1"></a>

#### web3 library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#web3-library) <a href="#web3-library" id="web3-library"></a>

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/gnosis/#example-request)

{% code overflow="wrap" %}
```
curl https://apigw-dev.chainprtcl.net/bsc \
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
curl https://apigw-dev.chainprtcl.net/klaytn \
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
curl https://apigw-dev.chainprtcl.net/klaytn \
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