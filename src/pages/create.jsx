import Button from '../components/common/button';
import Footer from '../components/common/footer';
import Navbar from '../components/common/navbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import usePageTitle from '../hooks/usePageTitle';
import { useSignCredential } from '../hooks/useSignCredential';
import toast from 'react-hot-toast';
import { useCredentialContext } from '../context/useCredentialContext';
import { useState } from 'react';
import { VerificationPresentation } from '../components/VerificationPresentation';
// import VCCard from '../components/common/VCCard';

const Create = () => {
  const { webConnect } = useCredentialContext();
  const [attributes, setAttributes] = useState({ key: '', value: '' });
  const [obj, setObj] = useState({});
  const { appState, signCredential } = useSignCredential();

  const { key, value } = attributes;
  const { isLoading, isError, error, isSuccess, success } = appState;
  // console.log(webConnect.myDid);
  const formik = useFormik({
    initialValues: {
      title: '',
      // purpose: '',
      applyingFor: 'Third party',
      recipientEmail: '',
      recipientID: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      // purpose: Yup.string().required('Purpose is required'),
      applyingFor: Yup.string().required('Applying for is required'),
      recipientEmail: Yup.string()
        .email('Invalid email address')
        .required('Recipient Email is required'),
      recipientID: Yup.string().required('Recipient ID is required'),
    }),
    onSubmit: async (values) => {
      // Handle form submission logic here
      const result = await signCredential({
        web5Object: webConnect.web5,
        email: values.recipientEmail,
        recipientDID: values.recipientID,
        title: values.title,
        purpose: values.applyingFor,
        properties: obj,
        option: values.applyingFor,
      });

      if (isSuccess) {
        setObj({})
        return toast.success(result)
      }
      else if (isError) return toast.error(error);
    },
  });

  // toast.success('test');

  const pushToArray = () => {
    if (!key || !value) return;
    setObj((prev) => ({
      ...prev,
      [attributes.key.trim()]: attributes.value.trim(),
    }));
    setAttributes({ key: '', value: '' });
  };

  const defaultStyle =
    'mt-1 py-3 px-3 w-full border border-gray-300 rounded-xl px-6 bg-gray-50';

  usePageTitle('Credential Genie — Create');

  console.log(webConnect.myDid)
  return (
    <>
      <Navbar />

      <section className="min-h-screen py-10">
        <div className="max-w-[75rem] mx-auto px-5">
          <div className="flex flex-col items-center justify-center gap-5 px-2">
            <h1 className="text-4xl max-w-[30ch] text-center text-primary-100">
              Create your unique verifiable credential
            </h1>
            <p className="text-gray-400 text-center">
              Fill the form below to create your verifiable credential (all
              fields are required)
            </p>
          </div>

          <div className="py-10 max-w-xl mx-auto">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5 mt-5"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title of verifiable credential
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Give a title intended"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className={defaultStyle}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.title}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="applyingFor"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Applying For{' '}
                    <span className="text-gray-400">(self or third party)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Please indicate whether for self or third party"
                    id="applyingFor"
                    name="applyingFor"
                    disabled
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.applyingFor}
                    className={defaultStyle}
                  />
                  {formik.touched.applyingFor && formik.errors.applyingFor && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.applyingFor}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="mb-4">
                  <label
                    htmlFor="recipientEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Recipient Email
                  </label>
                  <input
                    type="text"
                    id="recipientEmail"
                    placeholder="Enter the recipient e-mail address"
                    name="recipientEmail"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.recipientEmail}
                    className={defaultStyle}
                  />
                  {formik.touched.recipientEmail &&
                    formik.errors.recipientEmail && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.recipientEmail}
                      </div>
                    )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="recipientID"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Recipient ID
                  </label>
                  <input
                    type="text"
                    id="recipientID"
                    name="recipientID"
                    placeholder="Enter the ID of the receipient"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.recipientID}
                    className={defaultStyle}
                  />
                  {formik.touched.recipientID && formik.errors.recipientID && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.recipientID}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label
                  htmlFor="purpose"
                  className="block text-sm font-medium text-gray-700"
                >
                  Custom information on your VC{' '}
                  <span className="text-blue-500">(Complusory)</span>
                </label>

                <div className="grid grid-cols-[1fr_1fr] items-center justify-center gap-5">
                  <input
                    type="text"
                    value={key}
                    className={defaultStyle}
                    placeholder="Name eg. Position"
                    onChange={(e) =>
                      setAttributes((prev) => ({
                        ...prev,
                        key: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="text"
                    value={value}
                    className={defaultStyle}
                    placeholder="Value eg. Engineer"
                    onChange={(e) =>
                      setAttributes((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  />
                  <Button
                    onClick={pushToArray}
                    variant="outline"
                    size="md"
                    type="button"
                    colorScheme="dark"
                  >
                    Add Custom Information
                  </Button>
                </div>
              </div>

              {formik.values.title && formik.values.recipientID && (
                <VerificationPresentation
                  title={formik.values.title}
                  obj={obj} setObj={setObj}
                  myDid={webConnect.myDid}
                  recipientId={formik.values.recipientID}
                />
              )}

              <div className="grid md:flex md:justify-center mt-4">
                <Button
                  variant="fill"
                  size="md"
                  colorScheme="primary"
                  type="submit"
                >
                  {isLoading ? 'loading...' : 'Create Verifiable Credential'}
                  {/* {isLoading
                    ? 'loading...'
                    : isError
                    ? error
                    : isSuccess
                    ? success
                    : 'Create'} */}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Create;
