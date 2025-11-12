export default {
  settings: {
    title: "Paramètres",
    apparence: {
      label: "Apparence",
      description: "Personnalise l'apparence de l'application",
      modes: {
        light: "Mode clair",
        dark: "Mode sombre",
      },
    },
    language: {
      label: "Langue",
      description: "Choisi ta langue préférée",
      select: "Sélectionner la langue",
    },
    notifications: {
      label: "Notifications",
      description: "Gère tes préférences de notification",
      cta: "Paramètres de notification",
    },
    privacy: {
      label: "Confidentialité",
      description: "Consulte nos politiques de confidentialité",
      cta: "Politique de confidentialité",
      content: [
        "Nous accordons la plus grande importance à la confidentialité de vos données. Nous recueillons uniquement les informations nécessaires au bon fonctionnement du service et les traitons de manière sécurisée, conformément aux normes en vigueur.",
        "Les données sont conservées pour la durée strictement requise par les finalités indiquées et ne sont pas transmises à des tiers sans votre consentement explicite, sauf obligation légale. Vous disposez de droits d'accès, de rectification et de suppression de vos données.",
      ],
    },
    about: {
      label: "À propos",
      lastUpdated: {
        label: "Dernière mise à jour",
        date: "Novembre 2025",
      },
    },
    signOutButton: {
      signingOut: "Déconnexion en cours...",
      signOut: "Se déconnecter",
    },
  },
} as const;
