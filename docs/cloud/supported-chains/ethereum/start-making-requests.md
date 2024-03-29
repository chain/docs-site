---
description: An example of how to start making requests to Chain Cloud Ethereum RPC
---

# Start Making Requests

In this section, we'll create a simple script using Ethereum Mainnet RPC and Web3.js library to make requests.

1\) Create a new project directory

```
mkdir eth-requests && cd eth-requests
```

2\) Install [web3.js](https://web3js.readthedocs.io/en/v1.2.7/index.html) library

* Libraries simplify connecting an application to the Ethereum blockchain. You need to connect to Ethereum in order to read blockchain data and/or send transactions to the network.\*

```
npm install web3
```

3\) Create a landing page for your file and open it in your preferred code editor.

```
touch index.js 
```

4\) Now add the script below to `index.js`. The script does the following:

* Creates a web3 instance,
* Sets the provider to an Chain Protocol RPC
* Makes a request to get the latest Block Number.

```
const Web3 = require('web3');
const web3 = new Web3("https://apigw-dev.chainprtcl.net/eth"); // For Premium endpoints append API key to url "https://api-us.chainprtcl.net/eth/APIKEY"
web3.eth.getBlockNumber()
.then(console.log);
```

5\) Run the script in your code editor or in terminal/command-line.

You should see the latest Block Number as below!!!

```
node index.js
14679276
```