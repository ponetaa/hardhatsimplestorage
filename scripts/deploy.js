const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying the contract....")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(
        `the contract has been deployed to the address ${simpleStorage.address}`
    )
    console.log(network.config)
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        //for our example here, I have not put the api key because we will not be using rinkeby and also I was too lazy to sign up.
        await simpleStorage.deployTransaction.wait(6) //we wait for 6 blocks so that the contract has been successfully deployed.
        await verify(simpleStorage.address, [])
    }
    const currentFavNumber = await simpleStorage.retrieve()
    console.log(`current fav number is ${currentFavNumber}`)
    const updatedFavNumber = await simpleStorage.store(21)
    await updatedFavNumber.wait(1)
    const newFavNumber = await simpleStorage.retrieve()
    console.log(`the new favorite number is ${newFavNumber}`)
}
async function verify(contractAddress, args) {
    console.log("verifying contract, please wait....")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("the contract has already been verified!")
        } else {
            console.log(error)
        }
    }
}
// now lets interact with out smart contract!

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
