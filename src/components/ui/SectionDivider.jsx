const SectionDivider = ({ title }) => {
  return (
    <div className="border-t-2 border-dashed border-[#613A27] mb-2">
      <h2 className="text-center text-[#613A27] text-base font-bold mt-1">
        {title}
      </h2>
    </div>
  );
};

export default SectionDivider;
