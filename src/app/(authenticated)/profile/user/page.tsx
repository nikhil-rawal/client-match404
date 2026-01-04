"use client";

import UserCard from "@/_components/user-card";
import { useAuthStore } from "@/_store/store";
import LoadingBars from "@/_components/loading-bars";
import Link from "next/link";

const ProfilePage = () => {
  const { user } = useAuthStore();

  if (user === null) {
    return <LoadingBars />;
  }

  return (
    <div className="flex justify-center mt-24 flex-col items-center">
      <UserCard user={user} />
      <Link href="/profile/update">
        <button className="flex justify-center btn btn-secondary w-72">
          Edit Profile
        </button>
      </Link>
    </div>
  );
};

export default ProfilePage;
