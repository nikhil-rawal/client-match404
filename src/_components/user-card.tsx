import { User } from "@/_types/user";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="card bg-base-300 w-auto shadow-md flex flex-col items-center px-8">
      <div className="card-body">
        <h2 className="card-title">Your Profile</h2>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Joined At: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserCard;
