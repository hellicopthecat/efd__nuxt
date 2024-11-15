-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
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
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("complete", "createAt", "id", "itemDesc", "itemImage", "itemName", "itemPrice", "itemRestAdress", "itemRoadAdress", "itemSido", "itemSigungu", "updateAt", "userId") SELECT "complete", "createAt", "id", "itemDesc", "itemImage", "itemName", "itemPrice", "itemRestAdress", "itemRoadAdress", "itemSido", "itemSigungu", "updateAt", "userId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
