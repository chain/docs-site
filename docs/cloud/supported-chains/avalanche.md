---
description: Avalanche C-Chain network in Chain Cloud RPC service
---

# Avalanche

Avalanche is an **ecosystem** made up of three core Blockchains optimized for specific tasks within the network. The **Exchange Chain** (X-Chain), **Platform Chain** (P-Chain), and **Contract Chain** (C-Chain).

The **C-Chain** is available via Avalanche RPC.

Avalanche was built specifically with Defi dApps and protocols in mind, focusing on security, low latency & high throughput. Avalanche uses a novel consensus protocol by utilizing two different consensus mechanisms. The consensus protocol ensures a high degree of security and fast finality even with multiple chains running simultaneously.

### Quick links[​](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#quick-links) <a href="#quick-links" id="quick-links"></a>

[**Avalanche**](https://www.avalabs.org/)

[**Docs**](https://docs.avax.network/build/avalanchego-apis/issuing-api-calls)

[**Github**](https://github.com/ava-labs)

### Connect wallet[​](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#connect-wallet) <a href="#connect-wallet" id="connect-wallet"></a>

You can set up your **MetaMask wallet** to connect to Avalanche RPC. You can then perform transactions and interact with the network.

### Get started[​](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#get-started) <a href="#get-started" id="get-started"></a>

1. Open your **Metamask Extension** and click the '_**Network**_' drop down menu at the top.
2. Select '_**Custom RPC**_'.
3. Enter the settings below:

|   Chain   | Custom RPC Category |                                     Details                                      |
| :-------: | :-----------------: | :------------------------------------------------------------------------------: |
| Avalanche |    NETWORK NAME:    |                                  Avalanche RPC                                   |
|           |    NEW RPC URL:     | [https://apigw-dev.chainprtcl.net/avaxc](https://apigw-dev.chainprtcl.net/avaxc) |
|           |      CHAIN ID:      |                                      43114                                       |
|           |       SYMBOL:       |                                       AVAX                                       |
|           |   BLOCK EXPLORER:   |  [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)  |

### Integrate code <a href="#integrate-code" id="integrate-code"></a>

{% hint style="info" %}
**Avalanche** supports standard JSON RPC calls identical to [Geth's API](https://geth.ethereum.org/docs/rpc/server) for the following services:

* `web3_`
* `net_`
* `eth_`
* `personal_`
{% endhint %}

### Avalanche[​](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#avalanche-1) <a href="#avalanche-1" id="avalanche-1"></a>

#### web3 library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#web3-library) <a href="#web3-library" id="web3-library"></a>

* **clientVersion**

Returns the current client version.

**Example request**

```
curl https://apigw-dev.chainprtcl.net/avaxc \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
```

**Example response**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#example-response)

```
{"jsonrpc":"2.0","id":1,"result":"v0.7.2-rc.1"}
```

#### net library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#net-library) <a href="#net-library" id="net-library"></a>

* **net\_version**

Returns the current network id.

**Example request**

```
  curl https://apigw-dev.chainprtcl.net/avaxc \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

**Example response**[**​**](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#example-response-1)

```
{"jsonrpc":"2.0","id":67,"result":"43114"}
```

#### eth library[​](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#eth-library) <a href="#eth-library" id="eth-library"></a>

#### Example request <a href="#example-request-2" id="example-request-2"></a>

```
curl https://apigw-dev.chainprtcl.net/avaxc \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":67}'
```



#### Example response[​](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#example-response-2) <a href="#example-response-2" id="example-response-2"></a>

```
{"jsonrpc":"2.0","id":67,"result":"0xaf7bf1"}
```

***

### Integrate code[​](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#integrate-code-1) <a href="#integrate-code-1" id="integrate-code-1"></a>

#### web3[​](https://www.ankr.com/docs/build-blockchain/chains/v2/avalanche/#web3) <a href="#web3" id="web3"></a>

* **clientVersion**

```
package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://apigw-dev.chainprtcl.net/avaxc"
  method := "POST"

  payload := strings.NewReader(`{
    "jsonrpc":"2.0",
    "method":"web3_clientVersion",
    "params":[],
    "id":1
}`)

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("Content-Type", "application/json")

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}
```