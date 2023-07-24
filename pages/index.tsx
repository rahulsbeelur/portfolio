import fs from 'fs';
import YAML from 'yaml';
import Image from 'next/image';
import { Wrapper } from '../modules/common/components/Wrapper';
import { personDetails } from '../modules/common/data/person';
import { SocialHandles } from '../modules/common/components/SocialHandles';
import { checkImageResolutions } from '../modules/common/utils/imageUtils';
import { MdxPaths, TechnologiesPath } from '../constant/paths';
import { getMDData } from '../modules/common/utils/mdxUtils';
import { AboutMeIntroduction } from '../modules/about-me/models/type';
import { renderMDSection } from '../modules/common/utils/mdxBundlerUtils';
import { headerCase, paramCase } from 'change-case';

const Home = ({
    introductionContent,
    techStack
}: {
    introductionContent: AboutMeIntroduction;
    techStack: TechnologiesData;
}): JSX.Element => {
    return (
        <div className="mx-auto max-w-[2560px] desktop:mt-[138px] tablet:mt-[128px]">
            <div className="relative flex desktop:flex-row mobile:flex-col w-full mobile:bg-primary-background-color mobile:dark:bg-neutral-black-light">
                <div className="absolute desktop:w-[40%] tablet:w-[40%] mobile:hidden bg-primary-background-color dark:bg-neutral-black-light h-[100%]"></div>
                <div className="absolute desktop:w-[60%] tablet:w-[60%] mobile:hidden"></div>
                <div className="absolute desktop:hidden tablet:hidden bg-white dark:bg-neutral-black-darker w-full h-[400px]"></div>
                <Wrapper classes="relative h-full">
                    <div className="pl-[22%] tablet:pl-[15%] py-[5%] mobile:p-0 mobile:justify-center flex flex-row mobile:flex-col h-full gap-10">
                        <div className="w-[40%] mobile:w-[100%] h-[50%] shadow-md shadow-neutral-black-default mobile:mt-[120px]">
                            <div className="flex flex-col gap-6 bg-primary-background-color-lighter dark:bg-neutral-black-lighter text-neutral-black-darker p-10 text-center">
                                <div className="rounded-full overflow-hidden desktop:w-[200px] desktop:h-[200px] w-[150px] h-[150px] ml-auto mr-auto">
                                    <Image
                                        src="/my-photo.jpeg"
                                        alt="personal image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full"
                                    />
                                </div>
                                <p className="desktop:h5 tablet:h5 h5 font-[700] mt-auto mb-auto text-neutral-black-dark">
                                    {personDetails.name}
                                </p>
                                <div className="border border-1 text-neutral-black-dark w-[20%] ml-auto mr-auto"></div>
                                <p className="desktop:sub-headline3 tablet:sub-headline4 mobile:hidden !font-[400] desktop:mt-auto !uppercase !tracking-[5px] text-neutral-black-dark ">
                                    {personDetails.designation}
                                </p>
                            </div>
                            <div className="h-[64px] bg-neutral-white-lighter dark:bg-neutral-black-darker flex">
                                <div className="flex flex-row gap-6 mx-auto my-auto">
                                    <SocialHandles />
                                </div>
                            </div>
                        </div>

                        <div className="w-[40%] mobile:w-full flex flex-col justify-center">
                            {renderMDSection(introductionContent.code, introductionContent.layout)}
                        </div>
                    </div>
                </Wrapper>
            </div>
            <Wrapper classes="flex flex-col justify-center mobile:pt-0">
                <p className="h4 desktop:h2 mx-auto py-6 text-neutral-black-dark dark:text-neutral-white-light">
                    My Skills
                </p>
                {Object.entries(techStack).map(([category, technologies]) => (
                    <div key={category} className="w-[80%] mx-auto flex flex-col p-4 mobile:w-full">
                        <div className="flex flex-wrap flex-col p-4 rounded bg-primary-background-color-lighter dark:bg-neutral-black-lighter shadow-md shadow-neutral-black-default dark:shadow-md ">
                            <p className="flex justify-center h5 mobile:sub-headline1 text-neutral-black-dark">
                                {category === 'DevOps'
                                    ? category
                                    : headerCase(category).replace('-', ' ')}
                            </p>
                            <div className="flex flex-wrap justify-center ">
                                {technologies.map((tech) => (
                                    <div key={tech.fileName} className="p-6 flex flex-col ">
                                        <Image
                                            src={`/tech-stack/${paramCase(category)}/${
                                                tech.fileName
                                            }.png`}
                                            width={200}
                                            height={200}
                                            className="w-[100px] h-[100px] tablet:w-[75px] tablet:h-[75px] mobile:w-[75px] mobile:h-[75px] mx-auto"
                                            alt="alt"
                                        />
                                        <p className="mx-auto sub-headline4 text-neutral-black-dark mt-2">
                                            {tech.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Wrapper>
        </div>
    );
};

export default Home;

interface Technology {
    fileName: string;
    title: string;
}

interface TechnologiesData {
    [key: string]: Technology[];
}

export const getStaticProps = async (): Promise<{
    props: { introductionContent: AboutMeIntroduction; techStack: TechnologiesData };
}> => {
    checkImageResolutions('public');
    const introductionContent = await getMDData<AboutMeIntroduction>(
        `${MdxPaths.AboutMeIntroduction}/introduction.mdx`
    );
    const technologies: TechnologiesData = {};
    Object.entries(TechnologiesPath).forEach(([key, value]) => {
        const yamlData = fs.readFileSync(value, 'utf8');
        technologies[key] = YAML.parse(yamlData).technologies as Technology[];
    });
    return {
        props: {
            introductionContent: {
                code: introductionContent.code,
                layout: introductionContent.frontmatter.layout ?? 'DefaultLayout'
            },
            techStack: technologies
        }
    };
};
