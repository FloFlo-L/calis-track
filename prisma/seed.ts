import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

const langs = [{ code: "en" }, { code: "fr" }];

const exercises = [
  {
    name: {
      en: "Push-ups",
      fr: "Pompes",
    },
    description: {
      en: "Basic upper body exercise",
      fr: "Exercice de base pour le haut du corps",
    },
    images: ["pushup1.png", "pushup2.png"],
  },
  {
    name: {
      en: "Pull-ups",
      fr: "Tractions",
    },
    description: {
      en: "Exercise for back and biceps",
      fr: "Exercice pour le dos et les biceps",
    },
    images: ["pullup1.png", "pullup2.png"],
  },
  {
    name: {
      en: "Dips",
      fr: "Dips",
    },
    description: {
      en: "Exercise for triceps and chest",
      fr: "Exercice pour les triceps et la poitrine",
    },
    images: ["dip1.png", "dip2.png"],
  },
  {
    name: {
      en: "Squats",
      fr: "Squats",
    },
    description: {
      en: "Exercise for legs and glutes",
      fr: "Exercice pour les jambes et les fessiers",
    },
    images: ["squat1.png", "squat2.png"],
  },
  {
    name: {
      en: "Lunges",
      fr: "Fentes",
    },
    description: {
      en: "Exercise for legs and balance",
      fr: "Exercice pour les jambes et l'équilibre",
    },
    images: ["lunge1.png", "lunge2.png"],
  },
  {
    name: {
      en: "Plank",
      fr: "Planche",
    },
    description: {
      en: "Core strengthening exercise",
      fr: "Exercice de renforcement du tronc",
    },
    images: ["plank1.png", "plank2.png"],
  },
  {
    name: {
      en: "Burpees",
      fr: "Burpees",
    },
    description: {
      en: "Full body exercise",
      fr: "Exercice pour tout le corps",
    },
    images: ["burpee1.png", "burpee2.png"],
  },
  {
    name: {
      en: "Pistol Squats",
      fr: "Pistolet Squats",
    },
    description: {
      en: "Single-leg squat exercise",
      fr: "Exercice de squat sur une jambe",
    },
    images: ["pistol1.png", "pistol2.png"],
  },
];

async function main() {
  console.log("✨ Start seeding...");

  // delete dependent relations first to avoid FK errors
  await prisma.workoutExercise.deleteMany();
  await prisma.exerciseLang.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lang.deleteMany();
  console.log("🗑️ Tables cleaned.");

  // create languages (skipDuplicates if already present)
  await prisma.lang.createMany({
    data: langs,
    skipDuplicates: true,
  });
  const langsFromDb = await prisma.lang.findMany();
  const langByCode: Record<string, { id: string; code: string }> = {};
  for (const l of langsFromDb) {
    langByCode[l.code] = l as { id: string; code: string };
  }
  console.log("🌐 Languages added:", langsFromDb.map((l) => l.code).join(", "));

  // create exercises then their translations (ExerciseLang)
  for (const ex of exercises) {
    const createdExercise = await prisma.exercise.create({
      data: {
        images: ex.images,
      },
    });

    // create an ExerciseLang entry for each language available in the object
    for (const [code, name] of Object.entries(ex.name)) {
      const description = (ex.description as Record<string, string>)[code];
      const lang = langByCode[code];
      if (!lang) {
        console.warn(
          `⚠️ Language '${code}' not found in database — skipping translation for exercise ${createdExercise.id}`
        );
        continue;
      }

      await prisma.exerciseLang.create({
        data: {
          name,
          description,
          exerciseId: createdExercise.id,
          langId: lang.id,
        },
      });
    }

    console.log(`✅ Exercise created: id=${createdExercise.id}`);
  }

  console.log("✨ Seeding completed !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
