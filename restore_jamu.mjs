import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixAccess() {
  // Check admins
  const admin = await prisma.user.findUnique({
    where: { email: 'musicabalu@gmail.com' }
  });
  console.log('Admin user:', admin);

  // Restore Jamu's access
  const jamu = await prisma.user.update({
    where: { email: 'jamusanchez@gmail.com' },
    data: { hasActiveSub: true }
  });
  console.log('Jamu user updated:', jamu);

  // We need to recreate the dummy enrollment so the platform sees them as a family
  const groups = await prisma.group.findMany();
  const dummyGroup = groups[0];

  const enrollment = await prisma.enrollment.create({
    data: {
      userId: jamu.id,
      groupId: dummyGroup.id,
      childName: 'Dummy Child (Javi)',
      childBirthDate: '2020-01-01',
      parentName: 'Javi',
      phone: '123456789',
      email: jamu.email,
      paymentMethod: 'efectivo',
      paymentFrequency: 'mensual',
      status: 'active',
      acceptedTerms: true,
      acceptedComms: true
    }
  });

  console.log('Dummy enrollment recreated:', enrollment);
}

fixAccess().catch(console.error).finally(() => prisma.$disconnect());
