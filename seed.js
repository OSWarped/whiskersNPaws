const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed ServiceProvider
  await prisma.serviceProvider.create({
    data: {
      address: "7900 Clamshell Ave. Ocean Springs, MS 39564",
      latitude: 30.3590356,
      longitude: -88.7411398, // Example coordinates for New York City
    },
  });

  // Seed Services
  const services = [
    {
      name: "Home Visit",
      description: "Feeding, watering, and cleaning animal leavings at the pet's home.",
      basePricePerDay: 25.0,
    },
    {
      name: "Housing",
      description: "Providing a safe and comfortable space for the pet at our facility.",
      basePricePerDay: 40.0,
    },
    {
      name: "In-Home Stay",
      description: "Staying at the pet's home and providing full-time care.",
      basePricePerDay: 75.0,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  // Seed AddOns
  const addOns = [
    {
      name: "Bathing",
      description: "A full bath for your pet.",
      price: 10.0,
    },
    {
      name: "Grooming",
      description: "Basic grooming services.",
      price: 15.0,
    },
  ];

  for (const addOn of addOns) {
    await prisma.addOn.create({ data: addOn });
  }

  // Seed TravelCosts
  const travelCosts = [
    { minDistance: 0, maxDistance: 5, price: 5.0 },
    { minDistance: 5, maxDistance: 10, price: 10.0 },
    { minDistance: 10, maxDistance: 20, price: 20.0 },
    { minDistance: 20, maxDistance: 50, price: 50.0 },
  ];

  for (const travelCost of travelCosts) {
    await prisma.travelCost.create({ data: travelCost });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
