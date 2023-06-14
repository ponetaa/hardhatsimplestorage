require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")

/** @type import('hardhat/config').HardhatUserConfig */

const GANACHE_URL = process.env.GANACHE_RPC_URL || "https://eth-ganache-lol"
const GANACHE_KEY = process.env.GANACHE_PRIVATE_KEY || "0xkey"
const COINMARKET_APIKEY = process.env.COINMARKET_API_KEY || "key" //add alternatives just in case the env variable does not exist, so that hardhat does not get mad
module.exports = {
    //automatically chooses hardhat as the default network
    solidity: "0.8.8",
    networks: {
        ganache: {
            url: GANACHE_URL,
            accounts: [GANACHE_KEY],
            chainId: 1337,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
            //we don't need an account here because hardhat automatically gives us an account here.
        },
    },
    defaultNetwork: "hardhat",
    //you have to add the api key from etherscan here.
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKET_APIKEY,
        token: "MATIC", //you get the option to choose which tokens you want ot get the price for!
    },
}
