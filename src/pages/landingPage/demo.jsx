import { MdSwipe } from 'react-icons/md';
import VCCard from '../../components/common/VCCard';
import { demoCardData } from '../../services/data';

const Demo = () => {
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
          {demoCardData.map((item, index) => (
            <VCCard
              name={item.name}
              did={item.did}
              pattern={index + 1}
              key={item.id}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center text-4xl text-gray-500">
          <MdSwipe />
        </div>
      </div>
    </section>
  );
};

export default Demo;
