export const createIndexedDB = (cred) => {
  let request = window.indexedDB.open("userTokens", 1);
  request.onerror = (e) => {
    console.log("error", e);
  };
  request.onsuccess = (e) => {
    let db = e.target.result;
    // alert(`name ${db.name} version: ${db.version}`);
    console.log("success", e);
    addUserTokenInIndexedDB(cred);
  };

  request.onupgradeneeded = (e) => {
    let newDB = e.target.result;
    const objectStore = newDB.createObjectStore("user_store", {
      keyPath: "id",
    });
    objectStore.createIndex("tokens", "id", { unique: true });

    console.log("database setup success");
  };
};

export const addUserTokenInIndexedDB = (userCred) => {
  let request = window.indexedDB.open("userTokens", 1);
  let db = null;
  request.onsuccess = (e) => {
    db = e.target.result;
    const transaction = db.transaction(["user_store"], "readwrite");
    const userStore = transaction.objectStore("user_store");
    userStore.add(userCred);

    transaction.onerror = (e) => {
      console.log(e.target.error);
    };

    transaction.addEventListener("complete", () => {
      console.log("Transaction completed: database modification finished.");
    });
  };
};

export const readIndexedDB = () => {
    let request = window.indexedDB.open("userTokens", 1);
    request.onsuccess = (e) => {
      console.log(e, "sucess")
      let db = e.target.result;
      let tx = db.transaction("user_store", "readonly");
      let userStore = tx.objectStore('user_store')
      let openRequest = userStore.openCursor();
      openRequest.onsuccess = (r) => {
        const cursor = r.target.result

        if(cursor){
          let value = cursor.value
          console.log(value)
          return value
        }
      }
    }
};
