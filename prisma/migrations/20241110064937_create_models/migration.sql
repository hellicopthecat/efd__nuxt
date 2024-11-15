-- CreateTable
CREATE TABLE "User" (
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
    "userAdressUserId" INTEGER NOT NULL,
    CONSTRAINT "User_userAdressUserId_fkey" FOREIGN KEY ("userAdressUserId") REFERENCES "UserAdress" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserAdress" (
    "sido" TEXT NOT NULL,
    "sigungu" TEXT NOT NULL,
    "bname" TEXT NOT NULL,
    "bname1" TEXT,
    "roadAddress" TEXT NOT NULL,
    "buildingNmae" TEXT NOT NULL,
    "restAddress" TEXT,
    "zonecode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "itemName" TEXT NOT NULL,
    "itemImage" TEXT NOT NULL,
    "itemPrice" TEXT NOT NULL,
    "itemSido" TEXT NOT NULL,
    "itemSigungu" TEXT NOT NULL,
    "itemRoadAdress" TEXT NOT NULL,
    "itemRestAdress" TEXT NOT NULL,
    "itemDesc" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserAdress_userId_key" ON "UserAdress"("userId");
