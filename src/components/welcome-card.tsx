const WelcomeCard = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Welcome to match404!</h2>
        <p>Please login or register to continue.</p>
        <div className="card-actions justify-start mt-8">
          <button className="btn btn-primary">Login</button>
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
