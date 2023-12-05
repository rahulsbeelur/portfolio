import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { Button } from '../../modules/common/components/Button';
import { Download } from '../../icons/Download';

const Resume = (): JSX.Element => {
    return (
        <Wrapper>
            <div className="mx-auto max-w-[2560px] desktop:mt-[138px] tablet:mt-[128px] mt-20">
                <div className="flex justify-end mobile:justify-center">
                    <button
                        className="h5 mobile:small1 tablet:h6 bg-primary-background-color hover:bg-primary-background-color-darker dark:bg-neutral-black-light hover:dark:bg-neutral-black-default p-3 rounded-lg shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-none dark:hover:shadow-md text-neutral-black-darker"
                        aria-label="Download Resume"
                        onClick={() => document.getElementById('resumeToDownload')?.click()}>
                        Download Resume{' '}
                        <Download
                            height={30}
                            width={30}
                            className="mobile:w-5 mobile:h-5 tablet:w-6 tablet:h-6"
                        />
                        <a
                            download="rahul-s-beelur-resume.pdf"
                            href="/assets/rahul-s-beelur-resume.pdf"
                            id="resumeToDownload"
                        />
                    </button>
                </div>
            </div>
        </Wrapper>
    );
};

export default Resume;
