import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { sendContactForm } from '../../lib/api';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required')
});

const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setSubmitted(true);
        sendContactForm({ formData: data });
    };

    return (
        <Wrapper classes="bg-primary-background-color dark:bg-neutral-black-light normal-case">
            <div className="mt-[150px] mobile:mt-[100px] max-w-[520px] mx-auto bg-white shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] rounded px-8 pt-8 pb-8 mb-4 text-black dark:text-white dark:bg-neutral-black-darker">
                {!submitted ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-bold mb-2">
                                Name <span className="text-semantic-error-darker">*</span>
                            </label>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }): JSX.Element => (
                                    <div>
                                        <input
                                            {...field}
                                            className={`shadow appearance-none border ${
                                                errors.name
                                                    ? 'border-semantic-error-darker '
                                                    : 'border-gray-300 dark:border-neutral-black-dark'
                                            } rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral-white-default dark:bg-neutral-black-darker `}
                                            type="text"
                                            placeholder="Name"
                                        />
                                        {errors.name && (
                                            <p className="text-semantic-error-darker text-sm mt-1">
                                                Required
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-bold mb-2">
                                Email <span className="text-semantic-error-darker">*</span>
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }): JSX.Element => (
                                    <div>
                                        <input
                                            {...field}
                                            className={`shadow appearance-none border ${
                                                errors.email
                                                    ? 'border-semantic-error-darker '
                                                    : 'border-gray-300 dark:border-neutral-black-dark'
                                            } rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral-white-default dark:bg-neutral-black-darker`}
                                            type="email"
                                            placeholder="Email"
                                        />
                                        {errors.email && (
                                            <p className="text-semantic-error-darker text-sm mt-1">
                                                Required
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-bold mb-2">
                                Subject <span className="text-semantic-error-darker">*</span>
                            </label>
                            <Controller
                                name="subject"
                                control={control}
                                defaultValue=""
                                render={({ field }): JSX.Element => (
                                    <div>
                                        <input
                                            {...field}
                                            className={`shadow appearance-none border ${
                                                errors.subject
                                                    ? 'border-semantic-error-darker '
                                                    : 'border-gray-300 dark:border-neutral-black-dark'
                                            } rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none bg-neutral-white-default focus:shadow-outline dark:bg-neutral-black-darker`}
                                            type="text"
                                            placeholder="Subject"
                                        />
                                        {errors.subject && (
                                            <p className="text-sm mt-1 text-semantic-error-darker">
                                                Required
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-bold mb-2">
                                Message <span className="text-semantic-error-darker">*</span>
                            </label>
                            <Controller
                                name="message"
                                control={control}
                                defaultValue=""
                                render={({ field }): JSX.Element => (
                                    <div>
                                        <textarea
                                            {...field}
                                            className={`shadow appearance-none border ${
                                                errors.message
                                                    ? 'border-semantic-error-darker '
                                                    : 'border-gray-300 dark:border-neutral-black-dark'
                                            } rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none bg-neutral-white-default focus:shadow-outline dark:bg-neutral-black-darker`}
                                            placeholder="Message"
                                        />
                                        {errors.message && (
                                            <p className="text-semantic-error-darker text-sm mt-1">
                                                Required
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                className="sub-headline2 mobile:sub-headline3 tablet:sub-headline2 bg-primary-background-color dark:bg-neutral-black-light  hover:bg-primary-background-color-darker hover:dark:bg-neutral-black-default p-3 px-10 rounded-lg shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] text-neutral-black-darker"
                                type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className=" flex flex-col gap-10 text-center">
                        <p className="h4 mobile:h5">
                            🚀 Your message landed in my inbox like a charm!
                        </p>
                        <p className="h5 mobile:h6">
                            Buckle up; we&apos;re about to take off into a great chat! 🌌📬
                        </p>
                        <p>I will contact you through your email.</p>
                    </div>
                )}
            </div>
        </Wrapper>
    );
};

export default Contact;
