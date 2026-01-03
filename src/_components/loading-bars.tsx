const LoadingBars = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <span className="loading loading-bars loading-xl" />
    </div>
  );
};

export default LoadingBars;
