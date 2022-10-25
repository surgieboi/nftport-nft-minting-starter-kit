import React, { useRef } from 'react';
import { Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import PreviewImage from './preview-image';

const UploadForm = ({ address }) => {

    const fileRef = useRef(null);
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

    const apiKey = process.env.NEXT_PUBLIC_NFTPORT_API_KEY;
    const mintingChain = process.env.NEXT_PUBLIC_NFTPORT_MINTING_CHAIN;

    return (

        <div className="w-full md:w-6/12 text-center">
            <p className="mb-6">Complete the following and submit for minting:</p>
            <Formik
                validationSchema={Yup.object().shape({
                    file: Yup.mixed()
                        .required('An image is required')
                        .typeError('An image is required')
                        .test('FILE_FORMAT', 'The uploaded file format is not supported', function (value) {
                            return SUPPORTED_FORMATS.includes(value?.type)
                        }),
                    name: Yup.string()
                        .required('Come on, name it something cool asf')
                        .typeError('Come on, name it something cool asf'),
                    description: Yup.string()
                        .required('Ummmm... you forgot this one')
                        .typeError('Ummmm... you forgot this one')
                })}
                initialValues={{
                    file: null,
                    name: '',
                    description: ''
                }}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values));
                        console.log(values);

                        const form = new FormData();
                        form.append("file", values.file);

                        const options = {
                            method: 'POST',
                            body: form,
                            headers: {
                                "Authorization": `${apiKey}`,
                            },
                        };

                        fetch("https://api.nftport.xyz/v0/mints/easy/files?" + new URLSearchParams({
                            chain: mintingChain,
                            name: values.name,
                            description: values.description,
                            mint_to_address: address,
                        }), options)
                            .then(function (response) {
                                return response.json()
                            })
                            .then(function (responseJson) {
                                // Handle the response
                                console.log(responseJson);
                            })

                        setSubmitting(false);
                        resetForm();
                    }, 400);
                }}
            >
                {({
                    dirty,
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                }) => (
                    <form 
                        className="flex flex-col" 
                        onSubmit={handleSubmit}>

                        <Field onChange={handleChange} onBlur={handleBlur} id="name" name="name" placeholder="Name" type="text" className={'form-control w-full mb-2 p-4 rounded-2xl border border-slate-200 active:bg-slate-200 focus:outline-none focus:ring focus:ring-slate-200' + (errors.title && touched.title ? ' is-invalid' : '')} />
                        <ErrorMessage name="name" component="span" type="text" className="invalid text-sm" />

                        <Field onChange={handleChange} onBlur={handleBlur} id="description" name="description" placeholder="Description" type="text" className={'form-control w-full mt-4 mb-2 p-4 rounded-2xl border border-slate-200 active:bg-slate-200 focus:outline-none focus:ring focus:ring-slate-200' + (errors.title && touched.title ? ' is-invalid' : '')} />
                        <ErrorMessage name="description" component="span" type="text" className="invalid text-sm" />

                        <input
                            hidden
                            ref={fileRef}
                            type="file"
                            onBlur={handleBlur}
                            onChange={(event) => {
                                setFieldValue("file", event.target.files[0])
                            }} />
                        {values.file && <PreviewImage file={values.file} />}
                        <ErrorMessage name="file" component="span" type="file" className="invalid text-sm" />

                        <button
                            type="button"
                            className="my-4 p-4 hover:text-white hover:bg-slate-800 border border-slate-200 hover:border-slate-800 rounded-2xl"
                            onClick={() => {
                                fileRef.current.click();
                            }}>
                            Upload an Image
                        </button>

                        <button 
                            className="mb-6 p-4 border border-slate-200 disabled:bg-slate-200 disabled:text-slate-400 enabled:hover:border-slate-400 enabled:hover:text-white enabled:hover:bg-slate-800 rounded-2xl"
                            type="submit" 
                            disabled={!(isValid && dirty || isSubmitting)}>
                            {isSubmitting ? "Minting..." : "Mint"}
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
};

export default UploadForm;