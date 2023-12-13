const VCCard = ({ name, did, pattern }) => {
  const patterns = [
    {
      bg: 'bg-blue-500',
      pattern: 'background-three',
    },
    {
      bg: 'bg-orange-500',
      pattern: 'background-two',
    },
    {
      bg: 'bg-cyan-500',
      pattern: 'background-one',
    },
    {
      bg: 'bg-purple-500',
      pattern: 'background-four',
    },
  ];

  const selected = patterns[pattern - 1];

  return (
    <article
      className={`${selected.bg} font-mono grid grid-cols-[1fr_8rem] text-white rounded-xl w-[25rem] flex-shrink-0 overflow-hidden shadow-2xl`}
    >
      <div className="py-[40px] px-8 flex flex-col gap-[60px]">
        <div className="flex flex-col text-2xl">
          <p className="w-[15ch] wrap-text">{did}</p>
        </div>
        <p className="text-white text-xl">{name}</p>
      </div>

      <div className={selected.pattern}></div>
    </article>
  );
};

export default VCCard;
