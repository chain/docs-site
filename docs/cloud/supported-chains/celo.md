---
description: Celo network in Chain Cloud RPC service
---

# Celo

**Celo** is a mobile-first blockchain designed to make decentralized financial (DeFi) tools and services accessible to anyone with a mobile phone.

Celo is a layer 1 protocol and blockchain platform. The Celo Mainnet is entirely separate from the Ethereum network. The Celo client originated as a fork of Ethereum Go language client, [go-ethereum](https://github.com/ethereum/go-ethereum) (or geth). Celo has several significant differences, including a proof-of-stake based PBFT consensus mechanism.

All the cryptoassets on Celo have ERC-20 compliant interfaces, meaning that while they are not ERC-20 tokens on the Ethereum Mainnet, all familiar tooling and code that support ERC-20 tokens can be easily adapted for Celo assets, including the Celo Native Asset (CELO) and the Celo Dollar (cUSD).

### Quick links

[**Celo**](https://celo.org/)

[**Docs**](https://docs.celo.org/)

[**Github**](https://github.com/celo-org)

### Connect wallet

You can set up your **MetaMask wallet** to connect to Celo RPC. You can then perform transactions and interact with the network.

### Get started

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

| Chain | Custom RPC Category |                                    Details                                     |
| :---: | :-----------------: | :----------------------------------------------------------------------------: |
| Celo  |    NETWORK NAME:    |                                    Celo RPC                                    |
|       |    NEW RPC URL:     | [https://username.chainprtcl.net/celo/uid](https://username.chainprtcl.net/celo/uid) |
|       |      CHAIN ID:      |                                     42220                                      |
|       |       SYMBOL:       |                                      CELO                                      |
|       |   BLOCK EXPLORER:   |             [https://explorer.celo.org](https://explorer.celo.org)             |

### Integrate Code

#### web3 library

* **clientVersion**

Returns the current client version.

**Example request**

```
curl https://username.chainprtcl.net/celo/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**

```
{"jsonrpc":"2.0","id":1,"result":"celo/v1.7.2-stable/linux-amd64/go1.17.13"}
```

#### net library

* **net\_version**

Returns the current network id.

**Example request**

```
curl https://username.chainprtcl.net/celo/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**

```
{"jsonrpc":"2.0","id":67,"result":"42220"}
```

#### eth library

#### Example request

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/celo/uid \
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
{"timestamp":"2023-02-28T18:46:24.819+00:00","path":"/celo-X","status":404,"error":"Not Found","message":null,"requestId":"28555b1f-45"}
```

### Pricing

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $182                 |
| Archive Node          | $507                 |
| Testnet               | $182                 |