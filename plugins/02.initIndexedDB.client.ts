interface IUpgradeneededTypes {
  title: string;
  desc: string;
  roomID: string;
}
interface IReadData extends IUpgradeneededTypes {
  id: number;
}

export default defineNuxtPlugin(async () => {
  const BADGE = "BADGE";
  const OFFER = "OFFER";
  //Initialize IndexedDB
  const initDB = (ver: number) => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("notice-center", ver);

      request.addEventListener("success", (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      });

      request.addEventListener("error", () => {
        reject(new Error("DB로딩에 실패했ㅅ브니다."));
      });

      request.addEventListener("upgradeneeded", (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const dbs =
          db.objectStoreNames.contains(BADGE) &&
          db.objectStoreNames.contains(OFFER);
        if (!dbs) {
          db.createObjectStore(OFFER, {
            keyPath: "id",
            autoIncrement: true,
          });
          db.createObjectStore(BADGE, {keyPath: "id", autoIncrement: true});
        }
      });
    });
  };
  //Add Alert DB
  const addDB = async (
    storeName: string,
    ver: number,
    data: IUpgradeneededTypes
  ) => {
    const db = await initDB(ver);
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    const request = store.add(data);

    request.onsuccess = async (event) => {
      const success = (event.target as IDBOpenDBRequest).result;
      const db = (await getAllDB(storeName, ver)) as IReadData[];
      if (db.length >= 10) {
        store.delete(db[0]!.id);
      }
    };
    request.onerror = (event) => {
      console.log("addDB ERROR", event);
    };
  };

  //Get AlertDB
  const getAllDB = async (storeName: string, ver: number) => {
    const db = await initDB(ver);
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(OFFER);
    if (!store) {
      return [];
    }
    return new Promise((resolve, reject) => {
      const data = store.getAll();

      data.onsuccess = (event) => {
        const targetDB = (event.target as IDBOpenDBRequest).result;
        resolve(targetDB);
      };
      data.onerror = () => {
        reject(new Error("데이터를 불러오는데 실패했습니다."));
      };
    });
  };

  //Delete Alert
  const deleteData = async (storeName: string, ver: number, id: number) => {
    const db = await initDB(ver);
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(OFFER);
    const request = store.delete(id);
    return new Promise((resolve, reject) => {
      request.onsuccess = async (event) => {
        resolve(await getAllDB(storeName, ver));
      };
      request.onerror = (event) => {
        console.log("delete err");
      };
    });
  };

  //Get Alert
  const getAlertState = async (storeName: string, ver: number, id: number) => {
    const db = await initDB(ver);
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(BADGE);
    const request = store.get(id);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const data = (event.target as IDBOpenDBRequest).result;
        resolve(data);
      };
      request.onerror = (event) => {
        reject(new Error("알림상태를 확인할 수 없습니다."));
      };
    });
  };
  //Edit Alert DB
  const editAlertState = async (
    storeName: string,
    ver: number,
    id: number,
    state: string
  ) => {
    const db = await initDB(ver);
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    const request = store.get(id);
    request.onsuccess = (event) => {
      const data = (event.target as IDBOpenDBRequest).result;
      //@ts-ignore
      data.alert = state;
      store.put(data);
    };
    request.onerror = (event) => {};
  };
  return {
    provide: {
      addDB,
      getAllDB,
      deleteData,
      getAlertState,
      editAlertState,
    },
  };
});
