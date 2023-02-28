---
description: Cronos network in Chain Cloud RPC service
---

# Cronos

**Cronos** is a EVM-compatible chain running in parallel with the Crypto.org Chain. It aims to massively scale the Crypto.org Chain DeFi ecosystem by providing developers with the ability to rapidly port DApps from Ethereum and EVM-Compatible chains. Developers also gain access to the massive user base of the Crypto.com ecosystem and funding from Cronos Ecosystem Grants.

### **Quick Links**[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#quick-links) <a href="#quick-links" id="quick-links"></a>

****[**Cronos**](https://cronos.org/)****

****[**Docs**](https://docs.cronos.org/getting-started/readme)**​**

****[**Github**](https://github.com/crypto-org-chain/cronos)****

### Connect wallet[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to Cronos RPC. You can then perform transactions and interact with the network.

### Get started[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#get-started) <a href="#get-started" id="get-started"></a>

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

| Chain  | Custom RPC Category |                                   Details                                    |
| :----: | :-----------------: | :--------------------------------------------------------------------------: |
| Cronos |    NETWORK NAME:    |                                  Cronos RPC                                  |
|        |    NEW RPC URL:     | [https://username.chainprtcl.net/cro/uid](https://username.chainprtcl.net/cro/uid) |
|        |      CHAIN ID:      |                                      25                                      |
|        |       SYMBOL:       |                                     CRO                                      |
|        |   BLOCK EXPLORER:   |               [https://cronoscan.com/](https://cronoscan.com/)               |

### Integrate Code[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#gnosis-1) <a href="#gnosis-1" id="gnosis-1"></a>

#### web3 library[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#web3-library) <a href="#web3-library" id="web3-library"></a>

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/cronos/#example-request)

```
curl https://username.chainprtcl.net/cro/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/cronos/#example-response)

```
{"jsonrpc":"2.0","id":1,"result":"Version dev ()\nCompiled at  using Go go1.18.4 (amd64)"}
```

#### net library[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#net-library) <a href="#net-library" id="net-library"></a>

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/cronos/#example-request-1)

```
curl https://username.chainprtcl.net/cro/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/cronos/#example-response-1)

```
{"jsonrpc":"2.0","id":67,"result":"25"}
```

#### eth library[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#eth-library) <a href="#eth-library" id="eth-library"></a>

#### Example request[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#example-request-2) <a href="#example-request-2" id="example-request-2"></a>

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/cro/uid \
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

#### Example response[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#example-response-2) <a href="#example-response-2" id="example-response-2"></a>

```
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"rpc error: code = Internal desc = insufficient balance for transfer"}
```

### Pricing[​](https://docs.chain.com/docs/cloud/supported-chains/cronos/#pricing) <a href="#pricing" id="pricing"></a>

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $192                 |
| Archive Node          | $257                 |
| Testnet               | $192                 |