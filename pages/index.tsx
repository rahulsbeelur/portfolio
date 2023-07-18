import Image from 'next/image';
import { Wrapper } from '../modules/common/components/Wrapper';
import { personDetails } from '../modules/common/data/person';
import Link from 'next/link';
import { SVGIcons, IconType } from '../icons/SVGIcons';

const Home = (): JSX.Element => {
    const socialHandlesList = [
        { name: 'linked-in', link: 'https://www.linkedin.com/in/rahul-beelur/' },
        { name: 'twitter', link: 'https://twitter.com/rahul_beelur' }
    ];

    return (
        <div className="flex desktop:flex-row mobile:flex-col-reverse w-full h-full">
            <div className="absolute desktop:w-[40%] tablet:w-[40%] mobile:hidden bg-primary-background-color dark:bg-neutral-black-light h-full"></div>
            <div className="absolute desktop:w-[60%] tablet:w-[60%] mobile:hidden"></div>
            <div className="absolute desktop:hidden tablet:hidden bg-primary-background-color dark:bg-neutral-black-light h-[70%] w-full"></div>
            <Wrapper classes="relative h-full">
                <div className="pl-[22%] tablet:pl-[15%] pt-[5%] mobile:p-0 mobile:justify-center flex flex-row">
                    <div className="w-[40%] mobile:w-[100%] shadow-md hover:shadow-2xl shadow-neutral-black-default dark:shadow dark:hover:shadow-md dark:shadow-primary-lighter dark:hover:shadow-neutral-white-default">
                        <div className="flex flex-col gap-6  bg-primary-background-color-lighter dark:bg-neutral-black-lighter text-neutral-black-darker p-10 text-center">
                            <div className="rounded-full overflow-hidden w-[80%] ml-auto mr-auto">
                                <Image
                                    src="/personal-photo.png"
                                    alt="personal image"
                                    width={1000}
                                    height={1000}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <p className="desktop:h5 tablet:h5 h5 font-[700] mt-auto mb-auto text-neutral-black-dark ">
                                {personDetails.name}
                            </p>
                            <div className="border border-1 text-neutral-black-dark w-[20%] ml-auto mr-auto"></div>
                            <p className="desktop:sub-headline3 tablet:sub-headline4 mobile:hidden !font-[400] desktop:mt-auto  !uppercase !tracking-[5px] text-neutral-black-dark ">
                                {personDetails.designation}
                            </p>
                        </div>
                        <div className="h-[64px] bg-neutral-white-lighter dark:bg-neutral-black-darker flex">
                            <div className="flex flex-row gap-6 mx-auto my-auto">
                                {socialHandlesList.map((socialHandle, index) => (
                                    <Link
                                        key={index}
                                        href={socialHandle.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={socialHandle.name}
                                        >
                                        <SVGIcons
                                            type={socialHandle.name as IconType}
                                            width={26}
                                            height={26}
                                            className="text-neutral-black-default hover:text-neutral-black-darker dark:text-primary-lighter dark:hover:text-primary-light"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Home;
