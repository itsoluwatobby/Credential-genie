import { MdSwipe } from 'react-icons/md';
const Demo = () => {
  const list = [
    {
      id: 1,
      name: 'Moses Jack',
      did: 'did:web:12345',
      token: '1ay1b9n9f91j',
      bg: 'bg-blue-500',
      pattern: 'background-three',
    },
    {
      id: 2,
      name: 'Mary Jane',
      did: 'did:web:12345',
      token: '1ay1b9n9f91j',
      bg: 'bg-orange-500',
      pattern: 'background-two',
    },
    {
      id: 3,
      name: 'Isaac Newton',
      did: 'did:web:12345',
      token: '1ay1b9n9f91j',
      bg: 'bg-cyan-500',
      pattern: 'background-one',
    },
    {
      id: 4,
      name: 'Isaac Newton',
      did: 'did:web:12345',
      token: '1ay1b9n9f91j',
      bg: 'bg-purple-500',
      pattern: 'background-four',
    },
  ];
  const renderCard = (item) => {
    return (
      <article
        key={item.id}
        className={`${item.bg} font-mono grid grid-cols-[1fr_8rem] text-white rounded-xl w-[25rem] flex-shrink-0 overflow-hidden shadow-2xl`}
      >
        <div className="py-[40px] px-8 flex flex-col gap-[60px]">
          <div className="flex flex-col text-2xl">
            <p>{item.did}</p>
            <p>{item.token}</p>
          </div>
          <p className="text-white text-xl">{item.name}</p>
        </div>

        <div className={item.pattern}></div>
      </article>
    );
  };
  return (
    <section className="py-20">
      <div className="flex flex-col">
        <div className="flex flex-col items-start md:items-center justify-center gap-5 px-5 md:px-0">
          <h1 className="text-3xl md:text-4xl max-w-[30ch]">
            Verifiable Credentials Cards
          </h1>
          <p className="text-gray-500">
            With beautiful predefined templates it's easier to share your signed
            VC with clients
          </p>
        </div>

        <div
          className="w-full flex gap-8 overflow-x-scroll p-5 py-10 md:p-20
        scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin scrollbar-rounded-full"
        >
          {list.map((item) => renderCard(item))}
        </div>

        <div className="mt-10 flex items-center justify-center text-4xl text-gray-500">
          <MdSwipe />
        </div>
      </div>
    </section>
  );
};

export default Demo;
