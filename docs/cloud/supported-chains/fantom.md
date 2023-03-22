---
description: Polygon network in Chain Cloud RPC service
---

# Fantom

**Fantom** is a secure platform to build DApps. It is fully permissionless and open-source. Powered by Fantom’s aBFT consensus algorithm, it leverages its speed to produce real-world applications with no risks of congestion or long confirmation times. The Fantom Opera mainnet is compatible with the Ethereum Virtual Machine (EVM) and provides full smart contracts support through Solidity.

### Quick links[​](https://docs.chain.com/docs/cloud/supported-chains/fantom/#quick-links) <a href="#quick-links" id="quick-links"></a>

[**Fantom**](https://www.fantom.foundation/)

[**Docs**](https://docs.fantom.foundation/)

[**Github**](https://github.com/Fantom-Foundation)

### Connect wallet[​](https://docs.chain.com/docs/cloud/supported-chains/fantom/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to Fantom RPC. You can then perform transactions and interact with the network.

### Get started[​](https://docs.chain.com/docs/cloud/supported-chains/fantom/#get-started) <a href="#get-started" id="get-started"></a>

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

| Chain  | Custom RPC Category |                                   Details                                    |
| :----: | :-----------------: | :--------------------------------------------------------------------------: |
| Fantom |    NETWORK NAME:    |                                  Fantom RPC                                  |
|        |    NEW RPC URL:     | [https://username.chainprtcl.net/ftm/uid](https://username.chainprtcl.net/ftm/uid) |
|        |      CHAIN ID:      |                                     250                                      |
|        |       SYMBOL:       |                                     FTM                                      |
|        |   BLOCK EXPLORER:   |     [https://explorer.fantom.network/](https://explorer.fantom.network/)     |

### Integrate Code[​](https://docs.chain.com/docs/cloud/supported-chains/fantom/#gnosis-1) <a href="#gnosis-1" id="gnosis-1"></a>

#### web3 library[​](https://docs.chain.com/docs/cloud/supported-chains/fantom/#web3-library) <a href="#web3-library" id="web3-library"></a>

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/fantom/#example-request)

```
curl https://username.chainprtcl.net/ftm/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/fantom/#example-response)

```
{"jsonrpc":"2.0","id":1,"result":"go-opera/v1.1.1-rc.2-48966266-1656248907/linux-amd64/go1.18"}
```

#### net library[​](https://docs.chain.com/docs/cloud/supported-chains/fantom/#net-library) <a href="#net-library" id="net-library"></a>

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/fantom/#example-request-1)

```
curl https://username.chainprtcl.net/ftm/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/fantom/#example-response-1)

```
{"jsonrpc":"2.0","id":67,"result":"250"}
```

#### eth library[​](https://docs.chain.com/docs/cloud/supported-chains/fantom/#eth-library) <a href="#eth-library" id="eth-library"></a>

#### Example request[​](https://docs.chain.com/docs/cloud/supported-chains/fantom/#example-request-2) <a href="#example-request-2" id="example-request-2"></a>

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/ftm/uid \
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

#### Example response[​](https://docs.chain.com/docs/cloud/supported-chains/fantom/#example-response-2) <a href="#example-response-2" id="example-response-2"></a>

```
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"insufficient balance for transfer"}
```

### Pricing[​](https://docs.chain.com/docs/cloud/supported-chains/fantom/#pricing) <a href="#pricing" id="pricing"></a>

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $515                 |