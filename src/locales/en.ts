export default {
  settings: {
    title: "Settings",
    apparence: {
      label: "Appearance",
      description: "Personalize the look of the app",
      modes: {
        light: "Light mode",
        dark: "Dark mode",
      },
    },
    language: {
      label: "Language",
      description: "Choose your preferred language",
      select: "Select language",
    },
    notifications: {
      label: "Notifications",
      description: "Manage your notification preferences",
      cta: "Notification settings",
    },
    privacy: {
      label: "Privacy",
      description: "Review our privacy policies",
      cta: "Privacy policy",
    },
    about: {
      label: "About",
      lastUpdated: {
        label: "Last update",
        date: "November 2025",
      },
    },
    signOutButton: {
      signingOut: "Signing out...",
      signOut: "Sign out",
    },
  },
} as const;
