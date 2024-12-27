-- CreateTable
CREATE TABLE "_ReservationPets" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ReservationPets_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ReservationPets_B_index" ON "_ReservationPets"("B");

-- AddForeignKey
ALTER TABLE "_ReservationPets" ADD CONSTRAINT "_ReservationPets_A_fkey" FOREIGN KEY ("A") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationPets" ADD CONSTRAINT "_ReservationPets_B_fkey" FOREIGN KEY ("B") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
