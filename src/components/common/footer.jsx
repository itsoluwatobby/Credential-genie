import Logo from '../common/logo';

const Footer = () => {
  return (
    <footer className="py-10 bg-gray-50">
      <div className="max-w-[70rem] mx-auto px-5">
        <div className="flex justify-center">
          <Logo size={2} />
        </div>

        <div className="text-center">
          <p className="text-gray-500">
            Copyright &copy; 2023 Credential Genie. All rights reserved
          </p>
          {/* <p className="text-gray-500 mt-5">
            Made with ❤️ by{' '}
            <a href="" className="underline">
              CODEZERO
            </a>
            🚀
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
