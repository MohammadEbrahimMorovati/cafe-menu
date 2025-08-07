import { useTheme } from "../../contexts/useTheme";

const SectionDivider = ({ title }) => {
  const { theme } = useTheme();
  const color = theme.primary;

  return (
    <div
      className="border-t-2 border-dashed mb-2"
      style={{ borderColor: color }}
    >
      <h2 className="text-center text-base font-bold mt-1" style={{ color }}>
        {title}
      </h2>
    </div>
  );
};

export default SectionDivider;
