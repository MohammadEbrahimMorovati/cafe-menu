import { useTheme } from "../../contexts/useTheme";

const SectionDivider = ({ title, icon }) => {
  const { theme } = useTheme();
  const color = theme.primary || "#b8860b";

  return (
    <div className="flex items-center justify-end mb-6">
      {/* خط جداکننده گرادینتی (سمت چپ) */}
      <div
        className="flex-1 h-px mr-4"
        style={{
          background: `linear-gradient(to left, ${color}, transparent)`,
        }}
      ></div>

      {/* عنوان + آیکون */}
      <h2
        className="text-2xl font-title font-extrabold flex items-center gap-2 tracking-wide"
        style={{ color }}
      >
        {icon && <span className="text-2xl">{icon}</span>}
        {title}
      </h2>
    </div>
  );
};

export default SectionDivider;