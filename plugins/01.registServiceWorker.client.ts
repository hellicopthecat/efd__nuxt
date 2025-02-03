export default defineNuxtPlugin(async () => {
  return {
    provide: {
      registServiceWorker: async () => {
        if (import.meta.client && "serviceWorker" in navigator) {
          navigator.serviceWorker
            .register("/firebase-messaging-sw.js")
            .then((regist) => {
              console.log("Service Worker", regist);
              regist.addEventListener("updatefound", () => {
                regist.update();
                console.log("Service Worker Update", regist);
              });
            })
            .catch((err) => {
              console.log("service Worker Error", err);
            });
        }
      },
    },
  };
});
