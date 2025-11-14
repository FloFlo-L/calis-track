"use client";

import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Utility to convert VAPID key
function urlBase64ToUint8Array(base64String: string): BufferSource {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray as BufferSource;
}

// API functions
async function subscribeUser(
  subscription: PushSubscriptionJSON
): Promise<void> {
  const response = await fetch("/api/notifications/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    throw new Error("Failed to subscribe user");
  }
}

async function unsubscribeUser(): Promise<void> {
  const response = await fetch("/api/notifications/unsubscribe", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to unsubscribe user");
  }
}

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error("Error registering service worker:", error);
    }
  }

  async function subscribeToPush() {
    setIsLoading(true);
    try {
      // Request notification permission
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        toast.error("Notification permission denied");
        return;
      }

      const registration = await navigator.serviceWorker.ready;

      // Check if VAPID key is configured for push subscriptions
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (vapidKey) {
        // Subscribe to push notifications if VAPID key exists
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey),
        });

        setSubscription(sub);
        const serializedSub = JSON.parse(JSON.stringify(sub));
        // Call API to store subscription in database
        await subscribeUser(serializedSub);
      } else {
        // Just mark as subscribed for local notifications
        setSubscription({} as PushSubscription);
      }

      // Send immediate local notification via service worker
      await registration.showNotification("Notifications enabled!", {
        body: "You will now receive push notifications from CalisTrack",
        icon: "/web-app-manifest-192x192.png",
        badge: "/web-app-manifest-192x192.png",
        tag: "notification-enabled",
      });

      toast.success("Notifications enabled successfully");
    } catch (error) {
      console.error("Error subscribing to push:", error);
      toast.error("Failed to enable notifications");
    } finally {
      setIsLoading(false);
    }
  }

  async function unsubscribeFromPush() {
    setIsLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;

      // Send goodbye notification via service worker before unsubscribing
      await registration.showNotification("Notifications disabled", {
        body: "You will no longer receive push notifications from CalisTrack",
        icon: "/web-app-manifest-192x192.png",
        badge: "/web-app-manifest-192x192.png",
        tag: "notification-disabled",
      });

      // Unsubscribe from push notifications
      await subscription?.unsubscribe();

      // Call API to remove subscription from database
      await unsubscribeUser();

      setSubscription(null);

      toast.success("Notifications disabled successfully");
    } catch (error) {
      console.error("Error unsubscribing from push:", error);
      toast.error("Failed to disable notifications");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isSupported) {
    return (
      <Button
        variant="outline"
        className="w-full justify-start"
        size="lg"
        disabled
      >
        <BellOff className="size-4" />
        Not supported in this browser
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full justify-start"
      size="lg"
      onClick={subscription ? unsubscribeFromPush : subscribeToPush}
      disabled={isLoading}
    >
      {subscription ? (
        <>
          <Bell className="size-4" />
          {isLoading ? "Disabling..." : "Disable notifications"}
        </>
      ) : (
        <>
          <BellOff className="size-4" />
          {isLoading ? "Enabling..." : "Enable notifications"}
        </>
      )}
    </Button>
  );
}
