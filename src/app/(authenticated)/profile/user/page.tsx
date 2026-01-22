import UserCard from "@/_components/user-card";
import { useAuthStore } from "@/_store/store";
import LoadingBars from "@/_components/loading-bars";
import { Link } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  if (user === null) {
    return <LoadingBars />;
  }

  return (
    <div className="flex justify-center mt-24 flex-col items-center">
      <UserCard user={user} />
      <Link to="/profile/update">
        <button className="flex justify-center btn btn-secondary w-72 mt-2">
          Edit Profile
        </button>
      </Link>
      <Link to="/profile/change-password">
        <button className="flex justify-center btn btn-primary w-72 mt-2">
          Change Password
        </button>
      </Link>
    </div>
  );
};

export default ProfilePage;
