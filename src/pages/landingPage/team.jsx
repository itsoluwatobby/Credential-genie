import { teamData } from '../../services/data';

const Team = () => {
  const renderTeamCard = (item) => {
    return (
      <article
        key={item.id}
        className="p-5 gap-5 flex flex-col items-center justify-center border border-transparent hover:border-primary-100 rounded-xl"
      >
        <figure className="w-[8rem] h-[8rem]  rounded-full overflow-hidden bg-primary-100">
          {item.avatar && (
            <img src={item.avatar} className="w-full h-full object-cover" />
          )}
          {!item.avatar && (
            <p className="text-white flex text-center h-full items-center justify-center text-3xl">
              {item.initial}
            </p>
          )}
        </figure>

        <div className="flex flex-col items-center justify-center gap-2">
          <h4 className="text-primary-100 text-xl">{item.name}</h4>
          <p className="text-gray-500">{item.position}</p>
        </div>
      </article>
    );
  };
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[70rem] mx-auto px-5">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col gap-3">
            <h4 className="text-3xl md:text-4xl text-left md:text-center">
              <strong>CODEZERO🚀</strong>
            </h4>
            <p className="text-gray-500">
              We're a team dedicated to solving problems and delivering optimal
              products
            </p>
          </div>

          <div className="grid gap-5 grid-col-1 md:grid-cols-[max-content_max-content] lg:grid-cols-[max-content_max-content_max-content_max-content]">
            {teamData.map((item) => renderTeamCard(item))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
