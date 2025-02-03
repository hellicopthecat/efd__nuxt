import admin from "firebase-admin";
export const initFirebaseServer = () => {
  const config = useRuntimeConfig();
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: config.FIREBASE_ADMIN_CLIENT_EMAIL + "",
        privateKey: config.FIREBASE_ADMIN_PRIVATE_KEY + "",
        projectId: config.FIREBASE_ADMIN_PROJECTID + "",
      }),
    });
  }
  return admin;
};
