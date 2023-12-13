import { whyData } from '../../services/data';

const Why = () => {
  const renderCard = (item) => {
    return (
      <article className="bg-white flex flex-col gap-5 border rounded-xl py-8 px-8">
        <figure className="flex items-center justify-center mt-5">
          <div className="h-[8rem] md:h-[10rem] w-[8rem] md:w-[10rem] ">
            <img className="w-full h-full object-contain" src={item.image} />
          </div>
        </figure>

        <h4 className="text-3xl md:text-4xl mb-5 text-primary-100">
          {item.title}
        </h4>
        <p className=" text-gray-500">{item.description}</p>
      </article>
    );
  };
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[75rem] mx-auto px-5">
        <div className="flex flex-col gap-10">
          <h4 className="text-primary-100 text-center text-[1.5rem]">
            Why choose us?
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-center">
            {whyData.map((item) => renderCard(item))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
