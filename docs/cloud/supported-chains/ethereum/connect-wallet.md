---
description: How to Connect Wallet using Chain Cloud Ethereum RPC
---

# Connect Wallet

This section walks you through how to connect a MetaMask wallet to Ethereum Mainnet.

### How to add Ethereum Mainnet to your wallet[​](https://www.ankr.com/docs/build-blockchain/chains/v2/ethereum/how-to/connect-ethereum/#how-to-add-ethereum-mainnet-to-your-wallet) <a href="#how-to-add-ethereum-mainnet-to-your-wallet" id="how-to-add-ethereum-mainnet-to-your-wallet"></a>

This is the primary Ethereum production blockchain. Transactions on the Ethereum Mainnet occur on the blockchain and incur costs (ETH).

```
https://api-us.chainprtcl.net/eth
```

There are default settings in MetaMask for connecting a wallet to Ethereum Mainnet. However, it is possible to add additional RPC networks. It is generally better to have multiple networks to choose from for redundancy.

1.  In MetaMask, select **Add Network** and add the details below.

    _Make sure you include backslashes and don't add any whitespace._

| **Chain** | **Custom RPC Category** | **Details**                                                                       |
| --------- | ----------------------- | --------------------------------------------------------------------------------- |
| Ethereum  | NETWORK NAME:           | Chain Ethereum RPC                                                                |
|           | NEW RPC URL:            | [https://apigw-dev.chainprtcl.net/eth&#xD;](https://apigw-dev.chainprtcl.net/eth) |
|           | CHAIN ID:               | 1                                                                                 |
|           | SYMBOL:                 | ETH                                                                               |
|           | BLOCK EXPLORER URL:     | [https://etherscan.io/](https://etherscan.io/)                                    |

* Ignore the **Chain ID warning** and click **Save**.