importScripts(
  "https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyC7L6nTQd9McKNDOGh8lHd1whjqP8hybJI",
  projectId: "whenyouemergency",
  messagingSenderId: "558112973614",
  appId: "1:558112973614:web:9b7fdeb1a4a90a678210bf",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOption = {
    requireInteraction: true,
    icon: payload.notification.icon,
    body: payload.notification.body,
    data: payload.data,
  };

  const promise = new Promise((resolve, reject) => {
    const request = indexedDB.open("notice-center");
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("OFFER", "readwrite");
      const store = transaction.objectStore("OFFER");
      resolve(
        store.add({
          title: payload.notification.title,
          desc: payload.notification.body,
          roomID: payload.data.roomID,
        })
      );
    };
    request.onerror = (event) => {
      reject(new Error("background indexedDB ERR"));
    };
  });
  promise.then(() => {
    const BADGE = "BADGE";
    const badgeRequest = indexedDB.open("notice-center", 1);
    badgeRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("BADGE")) {
        db.createObjectStore("BADGE", {keyPath: "id", autoIncrement: true});
      }
    };
    badgeRequest.onsuccess = async (event) => {
      const db = event.target.result;
      const badgeTransaction = db.transaction(BADGE, "readwrite");
      const store = badgeTransaction.objectStore(BADGE);

      const targetData = store.get(1);
      targetData.onsuccess = (event) => {
        const data = event.target.result;

        if (!data) {
          return new Promise((resolve) => {
            const request = store.add({id: 1, alert: "true"});
            request.onsuccess = (event) => {};
            request.onerror = (event) => {};
          });
        } else {
          data.alert = "false";
          const requestUpdate = store.put(data);
          requestUpdate.onsuccess = (event) => {};
          requestUpdate.onerror = (event) => {};
        }
      };
      targetData.onerror = (event) => {};
    };
    badgeRequest.onerror = (event) => {
      reject(new Error("Badge State Failed"));
    };
  });
  self.registration.showNotification(notificationTitle, notificationOption);
});
