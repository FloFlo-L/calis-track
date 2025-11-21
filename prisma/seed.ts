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
    categories: ["Upper body", "Pectorals"],
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
    images: [],
    categories: ["Upper body", "Back"],
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
    images: [],
    categories: ["Upper body", "Triceps", "Pectorals"],
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
    images: [],
    categories: ["Lower body", "Glutes"],
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
    images: [],
    categories: ["Lower body", "Glutes"],
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
    images: [],
    categories: ["Upper body"],
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
    images: [],
    categories: ["Fullbody"],
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
    images: [],
    categories: ["Lower body", "Glutes"],
  },
];

const categories = [
  {
    name: {
      en: "Upper body",
      fr: "Haut du corps",
    },
  },
  {
    name: {
      en: "Lower body",
      fr: "Bas du corps",
    },
  },
  {
    name: {
      en: "Pectorals",
      fr: "Pectoraux",
    },
  },
  {
    name: {
      en: "Triceps",
      fr: "Triceps",
    },
  },
  {
    name: {
      en: "Glutes",
      fr: "Fessiers",
    },
  },
  {
    name: {
      en: "Fullbody",
      fr: "Corps entier",
    },
  },
  {
    name: {
      en: "Back",
      fr: "Dos",
    },
  },
];

async function main() {
  console.log("✨ Start seeding...");

  // delete dependent relations first to avoid FK errors
  await prisma.workoutExercise.deleteMany();
  await prisma.exerciseCategory.deleteMany();
  await prisma.exerciseLang.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.categoryLang.deleteMany();
  await prisma.category.deleteMany();
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

  // create categories then their translations (CategoryLang)
  const categoryByName: Record<string, { id: string }> = {};
  for (const cat of categories) {
    const createdCategory = await prisma.category.create({
      data: {},
    });

    // create a CategoryLang entry for each language available in the object
    for (const [code, name] of Object.entries(cat.name)) {
      const lang = langByCode[code];
      if (!lang) {
        console.warn(
          `⚠️ Language '${code}' not found in database — skipping translation for category ${createdCategory.id}`
        );
        continue;
      }

      await prisma.categoryLang.create({
        data: {
          name,
          categoryId: createdCategory.id,
          langId: lang.id,
        },
      });

      // Store category by English name for later reference
      if (code === "en") {
        categoryByName[name] = { id: createdCategory.id };
      }
    }

    console.log(`✅ Category created: id=${createdCategory.id}`);
  }

  // create exercises then their translations (ExerciseLang) and associate categories
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

    // Associate categories to exercise
    if (ex.categories && ex.categories.length > 0) {
      for (const catName of ex.categories) {
        const category = categoryByName[catName];
        if (!category) {
          console.warn(
            `⚠️ Category '${catName}' not found — skipping for exercise ${createdExercise.id}`
          );
          continue;
        }

        await prisma.exerciseCategory.create({
          data: {
            exerciseId: createdExercise.id,
            categoryId: category.id,
          },
        });
      }
      console.log(
        `✅ Exercise created: id=${
          createdExercise.id
        } with categories: ${ex.categories.join(", ")}`
      );
    } else {
      console.log(`✅ Exercise created: id=${createdExercise.id}`);
    }
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
