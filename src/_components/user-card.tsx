import { User } from "@/_types/user";
import { FeedUser } from "@/_types";

const UserCard = ({ user }: { user: User | FeedUser }) => {
  const isFullUser = (user: User | FeedUser): user is User => {
    return "email" in user && "phone" in user;
  };

  return (
    <div className="card bg-base-300 w-auto shadow-md flex flex-col items-center px-8">
      <div className="card-body">
        <h2 className="card-title">{user.firstName} Profile</h2>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        {isFullUser(user) && (
          <>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </>
        )}
        <p>Joined At: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserCard;
