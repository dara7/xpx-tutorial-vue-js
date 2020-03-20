export function IndexDbProvider() {
    this.addUser     = addUser;
    this.deleteUser  = deleteUser;
    this.getAllUser  = getAllUser;
    this.updateUser  = updateUser;

    this.deleteStore = deleteCollection;
    this.deleteDb    = deleteDb;
    this.openDb      = openDb;
    this.closeDb     = closeConnectDb;
}

let DBNAME = "UserAccount"
let objectStoreName = "users";
let request;

function callDb() {
    const request = indexedDB.open(DBNAME, 1);
    request.onupgradeneeded = () => {
        createCollection(request);
    };

    return request;
}

function addUser(username, account) {
    const request = callDb();
    let userData = [
        { 
            name: username,
            account: account 
        }
    ];
    
    request.onsuccess = (e) => {
        const db    = e.target.result;
        const tx    = db.transaction(objectStoreName, "readwrite");
        const store = tx.objectStore(objectStoreName);

        userData.forEach(user => store.put(user));
        tx.oncomplete = () => db.close();
    }
}

function getAllUser(key) {
    const request = callDb();
    return new Promise(resolve => {
        request.onsuccess = (e) => {
            const db    = e.target.result;
            const tx    = db.transaction(objectStoreName, "readwrite");
            const store = tx.objectStore(objectStoreName);
            const dataRequest = store.getAll(key);
            
            dataRequest.onsuccess = () => resolve(dataRequest.result);
            tx.oncomplete = () => db.close();
        };
    });
}

function updateUser(username, key) {
    let db    = request.result;
    let tx    = db.transaction(objectStoreName, "readwrite");
    let store = tx.objectStore(objectStoreName);

    store.openCursor(Number(key)).onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
          if (cursor.value) {
            console.log("cursor.value", cursor.value)
            const updateData = cursor.value;
              
            updateData.name = username;
            let req = cursor.update(updateData);
            req.onsuccess = () => {
              console.log('update success!');
            };
          }
        }
    }
}

function deleteUser(key) {
    let db    = request.result;
    let tx    = db.transaction(objectStoreName, "readwrite");
    let store = tx.objectStore(objectStoreName);
    store.delete(Number(key));
}

function deleteDb() {
    indexedDB.deleteDatabase(DBNAME);
    console.log('delete DB');
    alert("DB was deleted");
}

function deleteCollection() {
    request = indexedDB.open(DBNAME, 2);
    request.onupgradeneeded = () => {
        let db = request.result;
        db.deleteObjectStore(objectStoreName)
        console.log('delete store');
        alert("store was deleted");
    };
}

function createCollection(req) {
    let db = req.result;
    if (!db.objectStoreNames.contains(objectStoreName)) {
        let objectStore = db.createObjectStore(objectStoreName, { keyPath: "name" });
        // objectStore.createIndex("name", "name", { unique: true });
        objectStore.createIndex("account", "account", { unique: true });
        console.log('create store');
    }
    else 
        console.log('store already exit');
}

function closeConnectDb() {
    let db = request.result;
    let tx = db.transaction(objectStoreName, "readwrite");
    tx.oncomplete = () => db.close();
    console.log("db was closed");
}

function openDb() {
    callDb();
    console.log("db was openned");
}