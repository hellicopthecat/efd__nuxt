-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAdress" (
    "sido" TEXT NOT NULL,
    "sigungu" TEXT NOT NULL,
    "bname" TEXT NOT NULL,
    "bname1" TEXT,
    "roadAddress" TEXT NOT NULL,
    "buildingNmae" TEXT NOT NULL,
    "restAddress" TEXT,
    "zonecode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_UserAdress" ("bname", "bname1", "buildingNmae", "restAddress", "roadAddress", "sido", "sigungu", "userId", "zonecode") SELECT "bname", "bname1", "buildingNmae", "restAddress", "roadAddress", "sido", "sigungu", "userId", "zonecode" FROM "UserAdress";
DROP TABLE "UserAdress";
ALTER TABLE "new_UserAdress" RENAME TO "UserAdress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
