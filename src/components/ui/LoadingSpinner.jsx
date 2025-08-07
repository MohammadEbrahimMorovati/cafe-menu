import { useTheme } from "../../contexts/useTheme";

const LoadingSpinner = ({ message = "در حال بارگذاری..." }) => {
  const { theme } = useTheme();

  const backgroundColor = theme.primary || "#613A27";
  const textColor = theme.secondary || "#FBE6D3";

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <div className="text-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
          style={{ borderColor: textColor }}
        ></div>
        <div className="text-xl" style={{ color: textColor }}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
