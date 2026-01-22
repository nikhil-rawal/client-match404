import { Link } from "react-router-dom";
import { useAuthStore } from "@/_store/store";

const WelcomeCard = () => {
  const { user } = useAuthStore();

  return (
    <div className="card bg-base-300 w-auto shadow-md flex flex-col items-center px-8">
      {user !== null ? (
        <div className="card-body">
          <h2 className="card-title">Welcome to match404!</h2>
          <p>Hello, {user.firstName}!</p>
          <Link to="/user/feed">
            {" "}
            <button className="btn btn-primary btn-wide">Go to Feed</button>
          </Link>
        </div>
      ) : (
        <div className="card-body">
          <h2 className="card-title">Welcome to match404!</h2>
          <p>Please login or register to continue.</p>
          <div className="card-actions justify-center mt-8">
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-primary">Register</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeCard;
