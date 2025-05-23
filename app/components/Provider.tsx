"use client";

import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "./Notification";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY!;

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      console.error(error);
      throw new Error("Imagekit Authentication request failed");
    }
  };
  return (
    <NotificationProvider>
      <SessionProvider>
        <ImageKitProvider
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
          publicKey={publicKey}
        >
          {children}
        </ImageKitProvider>
      </SessionProvider>
    </NotificationProvider>
  );
}
