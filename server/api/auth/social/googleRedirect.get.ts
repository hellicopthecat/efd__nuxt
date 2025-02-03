import {google} from "googleapis";
import prisma from "~/lib/prisma";
import {initGoogleAuth} from "~/server/googleAuth";
import {ACCESSTOKEN, REFRESHTOKEN} from "~/utils/constants/constants";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);
  const oauth2Client = initGoogleAuth();
  const {tokens} = await oauth2Client.getToken(query.code + "");
  oauth2Client.setCredentials(tokens);
  const auth = google.oauth2({version: "v2", auth: oauth2Client});
  const {data} = await auth.userinfo.get();
  try {
    const existsUser = await prisma.user.findFirst({
      where: {email: data.email + ""},
    });
    if (existsUser) {
      const existsUserInfo = {
        uid: existsUser.id,
      };
      const refreshToken = await useSession(event, {
        name: REFRESHTOKEN,
        password: config.REFRESH_TOKEN_KEY,
        cookie: {
          httpOnly: true,
          sameSite: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        },
      });
      await refreshToken.update(existsUserInfo);

      //Access Token
      const accessToken = await useSession(event, {
        name: ACCESSTOKEN,
        password: config.ACCESS_TOKEN_KEY,
        cookie: {
          httpOnly: false,
          sameSite: true,
          secure: true,
          maxAge: 60 * 60 * 3,
          path: "/",
        },
      });
      await accessToken.update(existsUserInfo);
      return sendRedirect(event, "/");
    }
    const user = await prisma.user.create({
      data: {
        uid: data.id + "",
        email: data.email + "",
        name: data.name,
        kakaoId: null,
        googleId: data.email + "",
        avatarUrl: data.picture,
        address: {
          create: {
            sido: "",
            sigungu: "",
            zonecode: "",
            bname: "",
            bname1: "",
            roadAddress: "",
            buildingNmae: "",
            restAddress: "",
          },
        },
      },
    });

    const userInfo = {
      uid: user.id,
    };
    //Refresh Token
    const refreshToken = await useSession(event, {
      name: REFRESHTOKEN,
      password: config.REFRESH_TOKEN_KEY,
      cookie: {
        httpOnly: true,
        sameSite: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      },
    });
    await refreshToken.update(userInfo);

    //Access Token
    const accessToken = await useSession(event, {
      name: ACCESSTOKEN,
      password: config.ACCESS_TOKEN_KEY,
      cookie: {
        httpOnly: false,
        sameSite: true,
        secure: true,
        maxAge: 60 * 60 * 3,
        path: "/",
      },
    });
    await accessToken.update(userInfo);
    return sendRedirect(event, "/");
  } catch (error) {
    const err = error as Error;
  }
});
