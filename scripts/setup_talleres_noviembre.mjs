import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.workshop.findMany({
    orderBy: { createdAt: "desc" },
  });

  console.log("Talleres existentes antes:", existing);

  // Si ya había algún taller con enlace de Stripe real, lo reutilizamos por defecto
  const existingStripeLink =
    existing.find((w) => w.stripeLink && w.stripeLink.includes("stripe.com"))
      ?.stripeLink || "https://wa.me/34633715302?text=Hola%20Javi,%20quiero%20reservar%20plaza%20para%20el%20taller%20de%20Peque%C3%B1as%20Sonrisas";

  const targetWorkshops = [
    {
      title: "Taller en Pequeñas Sonrisas (La Flota) · 1ª Sesión",
      dateText:
        "Sábado 21 de noviembre · 11:00 a 11:45 h | 📍 Paseo Científico Gabriel Císcar, 22, 30007 Murcia (La Flota)",
      stripeLink: existingStripeLink,
      isActive: true,
      isSoldOut: false,
    },
    {
      title: "Taller en Pequeñas Sonrisas (La Flota) · 2ª Sesión",
      dateText:
        "Sábado 21 de noviembre · 12:00 a 12:45 h | 📍 Paseo Científico Gabriel Císcar, 22, 30007 Murcia (La Flota)",
      stripeLink: existingStripeLink,
      isActive: true,
      isSoldOut: false,
    },
    {
      title: "Taller en Pequeñas Sonrisas (El Ranero) · 1ª Sesión",
      dateText:
        "Sábado 28 de noviembre · 11:00 a 11:45 h | 📍 Av. Reyes Católicos, 26, Bajo, 30009 Murcia (El Ranero)",
      stripeLink: existingStripeLink,
      isActive: true,
      isSoldOut: false,
    },
    {
      title: "Taller en Pequeñas Sonrisas (El Ranero) · 2ª Sesión",
      dateText:
        "Sábado 28 de noviembre · 12:00 a 12:45 h | 📍 Av. Reyes Católicos, 26, Bajo, 30009 Murcia (El Ranero)",
      stripeLink: existingStripeLink,
      isActive: true,
      isSoldOut: false,
    },
  ];

  // Ocultar talleres antiguos que no sean estos 4
  for (const oldW of existing) {
    if (!targetWorkshops.some((t) => t.title === oldW.title)) {
      await prisma.workshop.update({
        where: { id: oldW.id },
        data: { isActive: false },
      });
    }
  }

  // Insertar o actualizar los 4 talleres
  // Los insertamos en orden inverso para que en orderBy: { createdAt: 'desc' } salgan primero el 21 nov 11:00, luego 21 nov 12:00, luego 28 nov 11:00, luego 28 nov 12:00
  for (const item of [...targetWorkshops].reverse()) {
    const found = existing.find((e) => e.title === item.title);
    if (found) {
      await prisma.workshop.update({
        where: { id: found.id },
        data: item,
      });
      console.log("Actualizado:", item.title);
    } else {
      await prisma.workshop.create({
        data: item,
      });
      console.log("Creado:", item.title);
      await new Promise((r) => setTimeout(r, 50));
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
