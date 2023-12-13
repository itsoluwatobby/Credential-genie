import { testimonialsData } from '../../services/data';

const Testimonials = () => {
  const renderCard = (item) => {
    return (
      <article
        key={item.id}
        className="rounded-xl p-8 border bg-white flex flex-col gap-7"
      >
        <div className="flex items-center md:justify-center justify-start w-full">
          <figure className="md:justify-center mt-0 md:mt-[-80px] w-[5rem] h-[5rem] overflow-hidden">
            <img className="w-full h-full object-cover" src={item.avatar} />
          </figure>
        </div>

        <p className="text-gray-500">{item.comment}</p>
        <h4 className="text-xl text-primary-100">{item.name}</h4>
      </article>
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[70rem] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-10 md:gap-5">
          <article className="flex flex-col gap-2">
            <p className="text-primary-100 text-xl">Testimonials</p>
            <h4 className="max-w-[15ch] text-4xl">
              Don’t believe us? Check what our users think of{' '}
              <span className="text-primary-100">Credential Genie</span>.
            </h4>
          </article>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonialsData.map((item) => renderCard(item))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
