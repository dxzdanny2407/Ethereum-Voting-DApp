# Ethereum-Voting-DApp
This is a Decentralized Application that submits and retrieves votes into an Ethereum blockchain.

## Prerequisites
* [Ethereum Wallet](https://github.com/ethereum/mist/releases)
* [Geth](https://geth.ethereum.org/downloads/)
* [Web3](https://github.com/ethereum/web3.js/)
* [Truffle](https://github.com/trufflesuite/truffle)

## How to run it?
First run install all npm modules.
```
$ npm install
```

After that run the Geth client node.
```
$ geth --fast --cache=1048 --testnet --rpc --rpcapi "eth,net,web3" --rpccorsdomain '*' --rpcaddr localhost --rpcport 8545
```
Then the IPC endpoint should be opened at:
`/Users/YourUser/Library/Ethereum/testnet/geth.ipc`

Once opened in another terminal you can open a connection to the client node with this command:
```
$ geth attach ipc:/Users/YourUser/Library/Ethereum/testnet/geth.ipc
```

You should create a new account:
```
> personal.newAccount()
```

This will give you a hash address like this `0x.......`

As this is a test network you can ask for fake ethereums in this page [http://faucet.ropsten.be:3001/](http://faucet.ropsten.be:3001/), just add your account address there.

Then to deploy the contracts first should unlock your account with this command:
```
> personal.unlockAccount(personal.listAccounts[0], 'yourpassword', 15000)
```

Then to deploy the contracts you should run this command:
```
$ truffle migrate
```

Once deployed you can start the server.
```
$ npm run dev
```
