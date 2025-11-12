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
