---
description: Bittorrent Chain network in Chain Cloud RPC service
---

# Bittorrent Chain

**Bittorrent Chain** (BTTC) is an extension of the public blockchain. It's a proof-of-stake (PoS) chain that supports Ethereum's existing features while also being speedier and with cheaper transaction fees.

### Quick links[​](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#quick-links) <input type="hidden" id="quick-links" />

****[**Bitttorrent Chain**](https://bttc.bittorrent.com/)****

****[**Docs**](https://doc.bt.io/docs/quickstart)****

****[**Github**](https://github.com/bttcprotocol)****

### Connect wallet[​](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#connect-wallet) <input type="hidden" id="connect-wallet" />

You can set up your **MetaMask wallet** to connect to BTTC RPC. You can then perform transactions and interact with the network.

### Get started[​](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#get-started) <input type="hidden" id="get-started" />

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'
3. Enter the settings below:

| Chain | Custom RPC Category |                                    Details                                     |
| :---: | :-----------------: | :----------------------------------------------------------------------------: |
| BTTC  |    NETWORK NAME:    |                                    BTTC RPC                                    |
|       |    NEW RPC URL:     | [https://username.chainprtcl.net/bttc/uid](https://username.chainprtcl.net/bttc/uid) |
|       |      CHAIN ID:      |                                      199                                       |
|       |       SYMBOL:       |                                      BTT                                       |
|       |   BLOCK EXPLORER:   |                 [https://bttcscan.com/](https://bttcscan.com/)                 |

### Integrate Code[​](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#gnosis-1) <input type="hidden" id="gnosis-1" />

#### web3 library[​](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#web3-library) <input type="hidden" id="web3-library" />

* **clientVersion**

Returns the current client version.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#example-request)

```
curl https://username.chainprtcl.net/bttc/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#example-response)

```
{"jsonrpc":"2.0","id":1,"result":"bor/v1.0.1-stable-53491784/linux-amd64/go1.18"}
```

#### net library[​](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#net-library) <input type="hidden" id="net-library" />

* **net\_version**

Returns the current network id.

**Example request**[**​**](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#example-request-1)

```
curl https://username.chainprtcl.net/bttc/uid \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#example-response-1)

```
{"jsonrpc":"2.0","id":67,"result":"199"}
```

#### eth library[​](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#eth-library) <input type="hidden" id="eth-library" />

#### Example request[​](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#example-request-2) <input type="hidden" id="example-request-2" />

**eth\_estimateGas**

Returns the gas price for the transaction in hex.

```
curl https://username.chainprtcl.net/bttc/uid \
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

#### Example response[​](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#example-response-2) <input type="hidden" id="example-response-2" />

```
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"err: insufficient funds for gas * price + value: address 0x8D97689C9818892B700e27F316cc3E41e17fBeb9 have 0 want 100000 (supplied gas 10010499)"}
```

### Pricing[​](https://docs.chain.com/docs/cloud/supported-chains/bittorent-chain/#pricing) <input type="hidden" id="pricing" />

| Node Type             | Price (USD)          |
| --------------------- | ---------------------|
| Fullnode              | $234                 |