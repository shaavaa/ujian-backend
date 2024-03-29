-- CreateTable
CREATE TABLE `Admin` (
    `adminID` INTEGER NOT NULL AUTO_INCREMENT,
    `namaAdmin` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`adminID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `carID` INTEGER NOT NULL AUTO_INCREMENT,
    `nopol` VARCHAR(191) NOT NULL DEFAULT '',
    `merkMobil` VARCHAR(191) NOT NULL DEFAULT '',
    `hargaPerhari` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`carID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rent` (
    `rentID` INTEGER NOT NULL AUTO_INCREMENT,
    `carID` INTEGER NOT NULL DEFAULT 0,
    `namaPenyewa` VARCHAR(191) NOT NULL DEFAULT '',
    `bookedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lamaSewa` VARCHAR(191) NOT NULL DEFAULT '',
    `totalBayar` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`rentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_carID_fkey` FOREIGN KEY (`carID`) REFERENCES `Car`(`carID`) ON DELETE RESTRICT ON UPDATE CASCADE;
