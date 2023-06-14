const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it("should update when store is called", async function () {
        const expectedValue = "4"
        const valueUpdater = await simpleStorage.store(expectedValue)
        await valueUpdater.wait(1)
        const newValue = await simpleStorage.retrieve()
        assert.equal(newValue.toString(), expectedValue)
    })
    it("should start with an initial value of 0", async function () {
        const expectedValue = "0"
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
        //or you can also use
        //expect(currentValue.toString().to.equal(expectedValue))
    })
    it("should actually add a person with info", async function () {
        const addingPerson = await simpleStorage.addPerson("Ammar", 28)
        await addingPerson.wait(1)
        const thatPerson = await simpleStorage.people(0)
        assert.equal(thatPerson.name, "Ammar")
    })
})

// we can use solidity coverage to check how many lines of code have been covered in tests and how many are vulnerable
//we have achieved 100 percent coverage for this code!
