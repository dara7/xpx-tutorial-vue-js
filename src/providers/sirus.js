import { QueryParams, Account, PublicAccount, NetworkType, AccountHttp, Deadline, TransferTransaction, PlainMessage, UInt64, Mosaic, MosaicId } from 'tsjs-xpx-chain-sdk';
import { Network }  from './utils';
import { NODE_URL } from './node_url';

export const SirusProvider = {
    getTxn:          getTxn,
    sendTxn:         sendTxn,
    createAccount:   generateNewAccount,
    recoveryAccount: recoveryAccount,
    getAccountInfo:  getAccountInfoForAnAccount
}

const API_URL       = NODE_URL.xpxsirius;
const NETWORK_TYPE  = NetworkType.TEST_NET;
const network       = new Network(API_URL);
const accountHttp   = new AccountHttp(API_URL);


function generateNewAccount() {
    const  newAccount = Account.generateNewAccount(NETWORK_TYPE);
    return newAccount;
}


async function recoveryAccount(privateKey) {
    const acc = Account.createFromPrivateKey(privateKey, NETWORK_TYPE);
    console.log("Account recoverd");
    return acc;
}



function sendTxn(sender, toAddress, mosaicId, amount, message = "") {
    const moId  = new MosaicId(mosaicId);
    const amtMo = new Mosaic(moId, UInt64.fromUint(amount * Math.pow(10, 6)));

    const tx = TransferTransaction.create(
        Deadline.create(),
        toAddress,
        [amtMo],
        PlainMessage.create(message),
        NETWORK_TYPE
    );

    network.networkProperties.then(networkProperties => {
        const signedTx = sender.sign(tx, networkProperties.generationHash);
        network.announceAndWaitForConfirmation(signedTx).then(tx => {
            console.log('Confirmed:');
            console.log(tx);
        });
    });
}



function getTxn(publicKey) {
    const pageSize = 10; 
    // const publicAccount = accountInfo.publicAccount; 
    // const publicAccount =  PublicAccount.createFromPublicKey(accountInfo.publicKey, NETWORK_TYPE);  
    const publicAccount =  PublicAccount.createFromPublicKey(publicKey, NETWORK_TYPE);
    accountHttp.transactions(publicAccount, new QueryParams(pageSize)).subscribe(transactions => console.log(transactions), err => console.error(err));    
}


function getAccountInfoForAnAccount(address) {
    return new Promise((resolve, reject) => {
        accountHttp.getAccountInfo(address).subscribe(accountInfo => resolve(accountInfo), 
        error => {
            alert("This account is not active");
            reject(error);
        });
    });
}
