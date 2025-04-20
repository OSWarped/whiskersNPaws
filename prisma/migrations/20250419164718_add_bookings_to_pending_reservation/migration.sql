/*
  Warnings:

  - Added the required column `bookings` to the `PendingReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PendingReservation" ADD COLUMN     "bookings" TEXT NOT NULL;
