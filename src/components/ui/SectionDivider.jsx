const SectionDivider = ({ title }) => {
  return (
    <div className="border-t-2 border-dashed border-[#613A27] mb-3">
      <h2 className="text-center text-[#613A27] text-lg font-bold mt-2">
        {title}
      </h2>
    </div>
  );
};

export default SectionDivider;
