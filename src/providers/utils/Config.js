import { Order, PublicAccount, BlockHttp, NetworkHttp, Listener, TransactionHttp, NamespaceHttp } from "tsjs-xpx-chain-sdk";
import { NODE_URL } from '../node_url';

export class NetworkProperties {
    constructor(nemesisBlockInfo, nemesisBlockTransactions) {
        this.generationHash = nemesisBlockInfo.generationHash;
        this.networkType = nemesisBlockInfo.networkType;
        // store also the whole network info, if we need more information later on
        this.nemesisBlockInfo = nemesisBlockInfo;
        this.nemesisBlockTransactions = nemesisBlockTransactions;
    }
}
class ApiEndpoint {
    constructor(url) {
        this.url = url;
    }
    get block() {
        if (!this._block) {
            this._block = new BlockHttp(this.url, this.network);
        }
        return this._block;
    }
    get listener() {
        if (!this._listener) {
            this._listener = new Listener(NODE_URL.wsnNodeUrl, WebSocket);
        }
        return this._listener;
    }
    get namespace() {
        if (!this._namespace) {
            this._namespace = new NamespaceHttp(this.url, this.network);
        }
        return this._namespace;
    }
    get network() {
        if (!this._network) {
            this._network = new NetworkHttp(this.url);
        }
        return this._network;
    }
    get transaction() {
        if (!this._transaction) {
            this._transaction = new TransactionHttp(this.url);
        }
        return this._transaction;
    }
}
export class Network {
    constructor(apiUrl) {
        this._api = new ApiEndpoint(apiUrl);
    }
    get api() {
        return this._api;
    }
    get networkProperties() {
        if (!this._networkProperties) {
            this._networkProperties = this.api.block.getBlockByHeight(1).toPromise().then(nemesisBlockInfo => {
                return this.api.block.getBlockTransactions(1, {
                    pageSize: 1000,
                    order: Order.ASC
                }).toPromise().then(nemesisBlockTransactions => {
                    return new NetworkProperties(nemesisBlockInfo, nemesisBlockTransactions);
                });
            });
        }
        
        return this._networkProperties;
    }
    announceAndWaitForConfirmation(signedTx, isAggregateBonded = false) {
        return new Promise((resolve, reject) => {
            this.api.listener.open().then(() => {
                const status = this.api.listener.status(PublicAccount.createFromPublicKey(signedTx.signer, signedTx.networkType).address).subscribe(txStatusError => {
                    if (txStatusError.hash === signedTx.hash) {
                        console.error(txStatusError);
                        sub.unsubscribe();
                        status.unsubscribe();
                        reject(txStatusError.status);
                    }
                });
                const sub = this.api.listener.confirmed(PublicAccount.createFromPublicKey(signedTx.signer, signedTx.networkType).address).subscribe(confirmedTx => {
                    if (confirmedTx && confirmedTx.transactionInfo && confirmedTx.transactionInfo.hash === signedTx.hash) {
                        // console.log('confirmed: ' + JSON.stringify(confirmedTx));
                        sub.unsubscribe();
                        status.unsubscribe();
                        resolve(confirmedTx);
                    }
                }, error => {
                    // console.error('subscription failed');
                    if (sub) {
                        sub.unsubscribe();
                    }
                    if (status) {
                        status.unsubscribe();
                    }
                    reject(error);
                }, () => {
                    // console.log('subscription finished');
                    if (sub) {
                        sub.unsubscribe();
                    }
                    if (status) {
                        status.unsubscribe();
                    }
                });
                if (isAggregateBonded) {
                    this.api.transaction.announceAggregateBonded(signedTx).subscribe(() => {
                        // console.log('announced');
                    }, error => {
                        // console.error('announce error');
                        sub.unsubscribe();
                        status.unsubscribe();
                        reject(error);
                    }, () => {
                        // console.log('announce finished');
                    });
                }
                else {
                    this.api.transaction.announce(signedTx).subscribe(() => {
                        // console.log('announced');
                    }, error => {
                        // console.error('announce error');
                        sub.unsubscribe();
                        status.unsubscribe();
                        reject(error);
                    }, () => {
                        // console.log('announce finished');
                    });
                }
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}