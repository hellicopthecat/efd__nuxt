-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "chat" TEXT NOT NULL,
    "chatRoomId" TEXT,
    CONSTRAINT "Chat_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Chat" ("chat", "chatRoomId", "createdAt", "id", "updateAt") SELECT "chat", "chatRoomId", "createdAt", "id", "updateAt" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "itemName" TEXT NOT NULL,
    "itemFileName" TEXT NOT NULL,
    "itemPrice" TEXT NOT NULL,
    "itemImageUrl" TEXT NOT NULL,
    "itemDesc" TEXT NOT NULL,
    "itemSido" TEXT NOT NULL,
    "itemSigungu" TEXT NOT NULL,
    "itemRoadAdress" TEXT NOT NULL,
    "itemRestAdress" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("complete", "createdAt", "id", "itemDesc", "itemFileName", "itemImageUrl", "itemName", "itemPrice", "itemRestAdress", "itemRoadAdress", "itemSido", "itemSigungu", "updatedAt", "userId") SELECT "complete", "createdAt", "id", "itemDesc", "itemFileName", "itemImageUrl", "itemName", "itemPrice", "itemRestAdress", "itemRoadAdress", "itemSido", "itemSigungu", "updatedAt", "userId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "googleId" TEXT,
    "kakaoId" TEXT,
    "avatarUrl" TEXT,
    "userAddressId" INTEGER NOT NULL,
    "chatRoomId" TEXT,
    CONSTRAINT "User_userAddressId_fkey" FOREIGN KEY ("userAddressId") REFERENCES "UserAddress" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatarUrl", "chatRoomId", "createdAt", "email", "googleId", "id", "kakaoId", "name", "password", "uid", "updatedAt", "userAddressId") SELECT "avatarUrl", "chatRoomId", "createdAt", "email", "googleId", "id", "kakaoId", "name", "password", "uid", "updatedAt", "userAddressId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
