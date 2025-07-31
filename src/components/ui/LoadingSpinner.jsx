const LoadingSpinner = ({ message = "در حال بارگذاری..." }) => {
  return (
    <div className="min-h-screen bg-[#613A27] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <div className="text-white text-xl">{message}</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
