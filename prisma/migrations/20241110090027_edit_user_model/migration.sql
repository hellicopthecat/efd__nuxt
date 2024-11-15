/*
  Warnings:

  - You are about to drop the `UserAdress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userAdressUserId` on the `User` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserAdress";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserAddress" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sido" TEXT NOT NULL,
    "sigungu" TEXT NOT NULL,
    "bname" TEXT NOT NULL,
    "bname1" TEXT,
    "roadAddress" TEXT NOT NULL,
    "buildingNmae" TEXT NOT NULL,
    "restAddress" TEXT,
    "zonecode" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "googleId" TEXT,
    "kakaoId" TEXT,
    "avatarUrl" TEXT,
    CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "UserAddress" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatarUrl", "createAt", "email", "googleId", "id", "kakaoId", "name", "password", "uid", "updateAt") SELECT "avatarUrl", "createAt", "email", "googleId", "id", "kakaoId", "name", "password", "uid", "updateAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_userId_key" ON "UserAddress"("userId");
