"use client";

import WelcomeCard from "@/_components/welcome-card";
import { useAuthStore } from "@/_store/store";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="flex justify-center mt-24">
      {user !== null ? (
        <div>
          <div>Welcome to the app</div>
          <div>Hello, {user.firstName}!</div>
        </div>
      ) : (
        <WelcomeCard />
      )}
    </div>
  );
}
