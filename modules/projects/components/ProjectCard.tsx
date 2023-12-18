import Link from 'next/link';
import Image from 'next/image';

export const ProjectCard = (): JSX.Element => {
    return (
        <Link
            href="https://rahulbeelur.pythonanywhere.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Movie Recommendation Deployment">
            <div className="flex mobile:flex-col-reverse mobile:justify-end min-h-[300px] mobile:min-h-[340px] max-w-[800px] mx-auto bg-white dark:bg-neutral-black-darker my-5 p-3 pr-0 mobile:my-0 mobile:p-0 shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] dark:text-white">
                <div className="w-[60%] mobile:w-full mobile:h-full">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex">
                            <div className="flex justify-start bg-[#696969] w-3 ml-[-12px] mobile:ml-0"></div>
                            <div className="text-left ml-2 sub-headline1 mobile:w-full mobile:sub-headline2">
                                Movie Recommendation using Scikit-learn
                            </div>
                        </div>
                        <button className="flex mx-auto rounded-lg shadow-[0_4px_8px_rgba(28,28,40)] hover:bg-primary-background-color-darker hover:dark:bg-neutral-black-default dark:shadow-[0_4px_12px_rgba(80,80,78)] w-[40%] h-[40px] bg-primary-background-color dark:bg-neutral-black-light sub-headline2 text-neutral-black-darker">
                            Deployment
                        </button>
                    </div>
                </div>
                <div className="w-[40%] mobile:w-full bg-[#696969] my-[-12px] mobile:my-0 justify-center flex align-middle overflow-clip">
                    <div className="w-[90%] flex align-middle mobile:h-[90%] mobile:my-4">
                        <Image
                            src="/projects/movie-recommendation.png"
                            alt="Movie Recommendation"
                            width={1000}
                            height={1000}
                            priority
                            className="aspect-video my-auto shadow-[0_4px_8px_rgba(28,28,40)]"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};
