import {initializeApp} from "firebase/app";
import {onMessage, getMessaging, getToken} from "firebase/messaging";
import type {IOnMessageDataType} from "~/types/message/messageType";

export default defineNuxtPlugin(async (nuxtApp) => {
  const {$addDB} = useNuxtApp();
  const newAlert = useNewAlert();

  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.FIREBASE_APIKEY,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN,
    projectId: config.public.FIREBASE_PROJECT_ID,
    messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.public.FIREBASE_APPID,
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  const token = await getToken(messaging, {
    vapidKey: config.public.FIREBASE_VAPID_KEY,
  });

  onMessage(messaging, async (payload) => {
    const payLoadTitle = payload.notification?.title;
    const payLoadOption = {
      icon: payload.notification?.icon,
      body: payload.notification?.body,
      data: payload.data,
    } as NotificationOptions;

    if (Notification.permission === "granted") {
      const noti = new Notification(payLoadTitle + "", payLoadOption);
      const data = noti.data as IOnMessageDataType;

      newAlert.value = {
        title: payLoadTitle + "",
        desc: payload.notification?.body + "",
        itemId: payload.data?.itemId + "",
        roomId: payload.data?.roomId + "",
      };

      await $addDB("OFFER", 1, {
        title: payLoadTitle + "",
        desc: payLoadOption.body + "",
        roomID: data.roomId,
      });

      noti.onclick = () => {
        window.open(`http://localhost:3000/chatting/${data.roomId}`);
      };
    }
  });

  return {
    provide: {
      firebase: app,
      messaging,
      token,
    },
  };
});
