/*
  Warnings:

  - The primary key for the `UserAddress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `userAddressId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
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
    "userAddressId" INTEGER NOT NULL,
    CONSTRAINT "User_userAddressId_fkey" FOREIGN KEY ("userAddressId") REFERENCES "UserAddress" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatarUrl", "createAt", "email", "googleId", "id", "kakaoId", "name", "password", "uid", "updateAt") SELECT "avatarUrl", "createAt", "email", "googleId", "id", "kakaoId", "name", "password", "uid", "updateAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_UserAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sido" TEXT NOT NULL,
    "sigungu" TEXT NOT NULL,
    "bname" TEXT NOT NULL,
    "bname1" TEXT,
    "roadAddress" TEXT NOT NULL,
    "buildingNmae" TEXT NOT NULL,
    "restAddress" TEXT,
    "zonecode" TEXT NOT NULL
);
INSERT INTO "new_UserAddress" ("bname", "bname1", "buildingNmae", "restAddress", "roadAddress", "sido", "sigungu", "zonecode") SELECT "bname", "bname1", "buildingNmae", "restAddress", "roadAddress", "sido", "sigungu", "zonecode" FROM "UserAddress";
DROP TABLE "UserAddress";
ALTER TABLE "new_UserAddress" RENAME TO "UserAddress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
