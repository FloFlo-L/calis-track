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
      content: [
        "We value your data privacy highly. We only collect information necessary for the proper functioning of the service and handle it securely, in accordance with current standards.",
        "Data is retained for the strictly required duration for the indicated purposes and is not shared with third parties without your explicit consent, except for legal obligations. You have rights of access, rectification, and deletion of your data.",
      ],
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
