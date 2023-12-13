import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import Button from '../components/common/button';
import Footer from '../components/common/footer';
import Navbar from '../components/common/navbar';
import { TbFileTypePdf } from 'react-icons/tb';
import usePageTitle from '../hooks/usePageTitle';

const Verify = () => {
  const formik = useFormik({
    initialValues: {
      upload: null,
    },
    validationSchema: Yup.object({
      upload: Yup.mixed()
        .required('File is required')
        .test('fileType', 'Only PDF files are allowed', (value) => {
          return value && value.type === 'application/pdf';
        }),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log('Form submitted with values:', values);
    },
  });

  usePageTitle('Credential Genie — Verify');

  return (
    <>
      <Navbar />

      <section className="min-h-screen py-10">
        <div className="max-w-[75rem] mx-auto px-5">
          <div className="flex flex-col items-center justify-center gap-5 px-3">
            <h1 className="text-4xl max-w-[30ch] text-center text-primary-100">
              Verify your unique verifiable credential
            </h1>
            <p className="text-gray-400 text-center">
              Upload your VC here for verification
            </p>
          </div>

          <div className="py-10 max-w-xl mx-auto">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5 items-center justify-center"
            >
              <div className="flex flex-col gap-5 relative">
                <input
                  type="file"
                  id="upload"
                  name="upload"
                  onChange={(event) =>
                    formik.setFieldValue('upload', event.currentTarget.files[0])
                  }
                  onBlur={formik.handleBlur}
                  className="form-input absolute h-full w-full opacity-0 cursor-pointer"
                />

                {!formik.values.upload && (
                  <div
                    className={`border-dashed border-4 ${
                      formik.errors.upload
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } bg-gray-50 h-[20rem] w-[20rem] p-5 rounded-full text-center flex flex-col gap-2 items-center justify-center cursor-pointer overflow-hidden`}
                  >
                    <TbFileTypePdf className="text-5xl text-primary-100" />
                    <h6 className="text-2xl text-gray-500 font-[700]">
                      Upload PDF
                    </h6>
                    <p className="text-sm text-gray-500 mt-4 w-[25ch]">
                      Click here to select a PDF File from your computer.
                    </p>
                  </div>
                )}

                {formik.values.upload && (
                  <div className="bg-gray-100 h-[20rem] w-[20rem] p-5 rounded-full cursor-pointer overflow-hidden flex flex-col gap-2 text-gray-500 items-center justify-center">
                    <h6 className="text-2xl font-[700] text-green-600 ">
                      Uploaded
                    </h6>
                    <p>Filename: {formik.values.upload.name}</p>
                    <p>
                      Size:{' '}
                      {Number(
                        formik.values.upload.size / (1024 * 1024)
                      ).toFixed(3)}
                      mb
                    </p>
                  </div>
                )}

                {!formik.values.upload && (
                  <div className="p-5 rounded-md text-center flex gap-2 items-center justify-center">
                    <FaInfoCircle className="text-lg text-red-600" />
                    {!formik.errors.upload && (
                      <p className="text-sm">
                        PDF size should not be above{' '}
                        <span className="font-[800]">5 MB</span>
                      </p>
                    )}

                    {formik.errors.upload && (
                      <p className="text-sm">{formik.errors.upload}</p>
                    )}
                  </div>
                )}

                {formik.values.upload && (
                  <div className="p-5 rounded-md text-center flex gap-2 items-center justify-center">
                    <FaCheckCircle className="text-lg text-green-600" />
                    <p className="text-sm">PDF uploaded successfully</p>
                  </div>
                )}
              </div>

              {/* <div className="grid md:flex md:justify-center mt-4">
                <Button
                  variant="fill"
                  size="md"
                  colorScheme="primary"
                  type="submit"
                >
                  Save
                </Button>
              </div> */}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Verify;
