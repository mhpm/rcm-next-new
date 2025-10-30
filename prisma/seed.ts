import { PrismaClient } from "@prisma/client";
import { mockData } from "../mock";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data in reverse order of dependencies
  console.log("🧹 Clearing existing data...");
  await prisma.memberMinistry.deleteMany();
  await prisma.members.deleteMany();
  await prisma.ministries.deleteMany();
  await prisma.churches.deleteMany();

  // Seed Churches
  console.log("⛪ Seeding churches...");
  for (const church of mockData.churches) {
    await prisma.churches.create({
      data: {
        id: church.id,
        name: church.name,
        slug: church.slug,
        createdAt: church.createdAt,
        updatedAt: church.updatedAt,
      },
    });
  }
  console.log(`✅ Created ${mockData.churches.length} churches`);

  // Seed Members
  console.log("👥 Seeding members...");
  for (const member of mockData.members) {
    await prisma.members.create({
      data: {
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phone: member.phone,
        age: member.age,
        street: member.street,
        city: member.city,
        state: member.state,
        zip: member.zip,
        country: member.country,
        birthDate: member.birthDate,
        baptismDate: member.baptismDate,
        role: member.role,
        gender: member.gender,
        pictureUrl: member.pictureUrl,
        notes: member.notes,
        passwordHash: member.passwordHash,
        church_id: member.church_id,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt,
      },
    });
  }
  console.log(`✅ Created ${mockData.members.length} members`);

  // Seed Ministries
  console.log("🙏 Seeding ministries...");
  for (const ministry of mockData.ministries) {
    await prisma.ministries.create({
      data: {
        id: ministry.id,
        name: ministry.name,
        description: ministry.description,
        church_id: ministry.church_id,
        createdAt: ministry.createdAt,
        updatedAt: ministry.updatedAt,
      },
    });
  }
  console.log(`✅ Created ${mockData.ministries.length} ministries`);

  // Seed Member-Ministry relationships
  console.log("🔗 Seeding member-ministry relationships...");
  for (const memberMinistry of mockData.memberMinistries) {
    await prisma.memberMinistry.create({
      data: {
        id: memberMinistry.id,
        memberId: memberMinistry.memberId,
        ministryId: memberMinistry.ministryId,
        church_id: memberMinistry.church_id,
        createdAt: memberMinistry.createdAt,
        updatedAt: memberMinistry.updatedAt,
      },
    });
  }
  console.log(
    `✅ Created ${mockData.memberMinistries.length} member-ministry relationships`
  );

  // Display summary statistics
  console.log("\n📊 Database seeding completed! Summary:");
  console.log("==========================================");

  for (const church of mockData.churches) {
    const members = mockData.members.filter((m) => m.church_id === church.id);
    const ministries = mockData.ministries.filter(
      (m) => m.church_id === church.id
    );
    const relationships = mockData.memberMinistries.filter(
      (mm) => mm.church_id === church.id
    );

    console.log(`\n⛪ ${church.name}:`);
    console.log(`   👥 Members: ${members.length}`);
    console.log(`   🙏 Ministries: ${ministries.length}`);
    console.log(`   🔗 Relationships: ${relationships.length}`);

    // Member role breakdown
    const roleBreakdown = members.reduce((acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log("   📋 Roles:");
    Object.entries(roleBreakdown).forEach(([role, count]) => {
      console.log(`      ${role}: ${count}`);
    });
  }

  console.log("\n🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
