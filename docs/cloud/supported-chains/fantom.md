---
description: Fantom network in Chain Cloud RPC service
---

# Fantom

**Fantom** is a secure platform to build DApps. It is fully permissionless and open-source. Powered by Fantom’s aBFT consensus algorithm, it leverages its speed to produce real-world applications with no risks of congestion or long confirmation times. The Fantom Opera mainnet is compatible with the Ethereum Virtual Machine (EVM) and provides full smart contracts support through Solidity.

### Quick links

[**Fantom**](https://www.fantom.foundation/)

[**Docs**](https://docs.fantom.foundation/)

[**Github**](https://github.com/Fantom-Foundation)

### Connect wallet

You can set up your **MetaMask wallet** to connect to Fantom RPC. You can then perform transactions and interact with the network.

### Get started

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

### Integrate Code

#### web3 library

* **clientVersion**

Returns the current client version.

**Example request**

```
curl https://username.chainprtcl.net/ftm/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**

```
{"jsonrpc":"2.0","id":1,"result":"go-opera/v1.1.1-rc.2-48966266-1656248907/linux-amd64/go1.18"}
```

#### net library

* **net\_version**

Returns the current network id.

**Example request**

```
curl https://username.chainprtcl.net/ftm/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**

```
{"jsonrpc":"2.0","id":67,"result":"250"}
```

#### eth library

#### Example request

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

#### Example response

```
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"insufficient balance for transfer"}
```

### Pricing

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $515                 |