import { SirusProvider } from '../../providers/sirius';
import { IndexDbProvider } from '../../providers/indexdb';
import { Address } from 'tsjs-xpx-chain-sdk';
import { NODE_URL } from '../../providers/node_url';


export default {
    name: 'SampleSdk',
    props: {
      msg: String
    },
    data () { return main() } 
}

function main() {
    setup();
    return app;
}

/**** Data Binding ****/
const app = {
    nodes:  ['bctestnet3', 'bctestnet2', 'bctestnet1'],
    userName:    "",
    address:     "",
    publicKey:   "",
    privatekey:  "",

    mosaicXpx:   "",
    accountInfo: "",

    amtXPX:      "",
    message:     "",
    users:       [],
    addrSearch:  "",
    isMsgError:  false,
    firstSelectedSender:   true,
    firstSelectedReceiver: true,
    firstSelectedUserName: true,
    firstSelectedUserInfo: true,

/**** Methode ***/
    changeNode:     changeNode,
    changeUser:     changeUser,
    changeSender:   changeSender,
    changeReceiver: changeReceiver,
    changeUserInfo: changeUserInfo,
    
    // clear:         clear,
    send:          send,
    getTxn:        getTxn,
    createAccount: createAccount,
};


const iddb = new IndexDbProvider();
let   senderName, receiverName, user_Name;


function setup() {
    setUserNameInCombobox();
}


async function createAccount(userName) {
    if (!userName) return alert("Please enter user name!");
    let state    =  await isUserCreatedAlready(userName);

    if(state) 
        alert("This user already exit!");
    else {
        const newAcc = SirusProvider.createAccount();
        setData(newAcc, userName);
        setUserNameInCombobox();
    }
}


async function isUserCreatedAlready(userName) {
    const user = await iddb.getAllUser(userName); 
    return user.length === 0 ? false : true;
}




async function setUserNameInCombobox() {
    const users = await iddb.getAllUser();
      app.users = [];
    users.forEach(user => app.users.push(user.name));
}


async function setData(newAcc, userName) { 
    app.address    = newAcc.address.plain();
    app.publicKey  = newAcc.publicKey;
    app.privatekey = newAcc.privateKey;

//  ----- Save data ---------
    iddb.addUser(userName, newAcc.privateKey);
}



async function getAccountInFo(address) {
    let accountInfo = null;
    let accInfoJson = "";
    let amtXPX      = 0;

    try {
        app.isMsgError = false;
        accountInfo = await SirusProvider.getAccountInfo(address);
    } catch(err) {
        app.isMsgError = true; 
        alert("Account not Activated in Blockchain. Please send some xpx from your Testnet Wallet to this Account.");
    }

    if (!app.isMsgError) {
        accInfoJson = JSON.stringify(accountInfo);
        amtXPX      = accountInfo.mosaics[0].amount.compact() / Math.pow(10, 6);
    }

    return { accInfoJson, amtXPX };
}


function changeSender(evt) {
    if (app.firstSelectedSender) app.firstSelectedSender = false;
    senderName = evt.target.value;
}


function changeReceiver(evt) {
    if (app.firstSelectedReceiver) app.firstSelectedReceiver = false;
    receiverName = evt.target.value;
}


function changeUser(evt) {
    if (app.firstSelectedUserName) app.firstSelectedUserName = false;
    user_Name  = evt.target.value;
}


function changeNode(evt) {
    const node = evt.target.value.substr(-1);
    NODE_URL.setNode(node);
}


async function changeUserInfo(evt, component="") {
    let address = "";
    if (component == 'button') {
        address = evt;
        address =  new Address(address);
    } else {
        if (app.firstSelectedUserInfo) app.firstSelectedUserInfo = false;

        const userName  = evt.target.value;
        const user      = await iddb.getAllUser(userName); 
        address         = (await SirusProvider.recoveryAccount(user[0].account)).address;
        app.addrSearch  = address.plain();
    }

    const accInfo   = await getAccountInFo(address);
    app.mosaicXpx   = accInfo.amtXPX;
    app.accountInfo = accInfo.accInfoJson;
}


async function send(amt, message) {
    senderName   = app.users.find(user => user == senderName);
    receiverName = app.users.find(user => user == receiverName);

    if (!amt)                         return alert("Please enter amount!");
    if (!senderName || !receiverName) return alert("Please enter sender name or receiver name!");

    const senderAcc      = await iddb.getAllUser(senderName); 
    const sender         = await SirusProvider.recoveryAccount(senderAcc[0].account);
    const senderInfo     = await SirusProvider.getAccountInfo(sender.address);
    const senderMosaicId = senderInfo.mosaics[0].toDTO().id;

    const receiverAcc    = await iddb.getAllUser(receiverName);
    const receiver       = await SirusProvider.recoveryAccount(receiverAcc[0].account);

    SirusProvider.sendTxn(sender, receiver.address, senderMosaicId, Number(amt), message);
}


async function getTxn() {
    if (!user_Name)    return alert("Please select user!");

    const username   = await iddb.getAllUser(user_Name); 
    const userAccoun = await SirusProvider.recoveryAccount(username[0].account);
    SirusProvider.getTxn(userAccoun.publicKey);
}


// function clear() {
//     app.userName   = "";
//     app.address    = "";
//     app.publicKey  = "";
//     app.privatekey = "";

//     app.mosaicXpx   = "";
//     app.accountInfo = "";

//     app.amtXPX  = "";
//     app.message = "";

//     // location.reload();
// }
