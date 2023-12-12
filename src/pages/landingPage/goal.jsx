import Column from '../../components/common/column';
import illlustration from '../../assets/goal-illustration.png';
import Button from '../../components/common/button';

const Goal = () => {
  return (
    <section className="py-10">
      <div className="max-w-[75rem] mx-auto px-5">
        <Column col="2" items="center" justify="center" gap={10}>
          <figure className="hidden md:flex items-center justify-center">
            <div className="w-[20rem]">
              <img
                className="w-full h-full object-contain"
                src={illlustration}
              />
            </div>
          </figure>

          <article className="flex flex-col gap-5">
            <h3 className="text-3xl md:text-4xl">Our Goal</h3>

            <p className="max-w-[40ch] text-gray-500 mb-5 text-lg">
              At Credential Genie, we believe in empowering individuals and
              organizations with the revolutionary potential of verifiable
              credentials.
            </p>

            <div className="md:block grid">
              <Button size="md" variant="outline" colorScheme="primary">
                Contact Us
              </Button>
            </div>
          </article>

          <figure className="flex md:hidden items-center justify-center">
            <div className="w-[20rem]">
              <img
                className="w-full h-full object-contain"
                src={illlustration}
              />
            </div>
          </figure>
        </Column>
      </div>
    </section>
  );
};

export default Goal;
