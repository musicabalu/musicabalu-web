import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'jamusanchez@gmail.com';
  
  // Revert user role back to 'familia'
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { role: 'familia' }
  });
  console.log(`Reverted ${updatedUser.email} to role: ${updatedUser.role}`);

  // Find a group to attach the dummy enrollment
  const group = await prisma.group.findFirst();
  if (!group) {
    console.log("No groups found, cannot create enrollment.");
    return;
  }

  // Check if enrollment already exists
  const existingEnrollment = await prisma.enrollment.findFirst({
    where: { email, childName: 'Dummy Child (Javi)' }
  });

  if (!existingEnrollment) {
    const newEnrollment = await prisma.enrollment.create({
      data: {
        userId: updatedUser.id,
        email: email,
        parentName: 'Javi Muñoz Sánchez',
        childName: 'Dummy Child (Javi)',
        childBirthDate: '2024-01-01',
        phone: '600000000',
        groupId: group.id,
        status: 'active',
        paymentMethod: 'efectivo',
        paymentFrequency: 'monthly',
        isEmpi: false,
        attendanceData: '{}'
      }
    });
    console.log(`Created active enrollment for ${email}`);
  } else {
    // If it exists but is not active, activate it
    await prisma.enrollment.update({
      where: { id: existingEnrollment.id },
      data: { status: 'active' }
    });
    console.log(`Activated existing enrollment for ${email}`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
