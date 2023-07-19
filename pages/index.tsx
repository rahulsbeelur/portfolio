import Image from 'next/image';
import { Wrapper } from '../modules/common/components/Wrapper';
import { personDetails } from '../modules/common/data/person';
import { SocialHandles } from '../modules/common/components/SocialHandles';

const Home = (): JSX.Element => {
    return (
        <div className="mx-auto max-w-[2560px]">
            <div className="relative flex desktop:flex-row mobile:flex-col w-full mobile:bg-primary-background-color mobile:dark:bg-neutral-black-light">
                <div className="absolute desktop:w-[40%] tablet:w-[40%] mobile:hidden bg-primary-background-color dark:bg-neutral-black-light h-[100%]"></div>
                <div className="absolute desktop:w-[60%] tablet:w-[60%] mobile:hidden"></div>
                <div className="absolute desktop:hidden tablet:hidden bg-white dark:bg-neutral-black-darker w-full h-[300px]"></div>
                <Wrapper classes="relative h-full">
                    <div className="pl-[22%] tablet:pl-[15%] pt-[5%] mobile:p-0 mobile:justify-center flex flex-row mobile:flex-col h-full gap-10">
                        <div className="w-[40%] mobile:w-[100%] h-[50%] shadow-md shadow-neutral-black-default ">
                            <div className="flex flex-col gap-6 bg-primary-background-color-lighter dark:bg-neutral-black-lighter text-neutral-black-darker p-10 text-center">
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

                        <div className="desktop:body1 body2 w-[40%] mobile:w-full mobile:text-neutral-black-dark flex flex-col justify-center">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam error
                            eum id inventore velit, laborum consequatur, unde obcaecati est
                            exercitationem, ea iure facere placeat praesentium aspernatur fugiat ab
                            possimus? Minima. Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Aliquam error eum id inventore velit, laborum consequatur, unde
                            obcaecati est exercitationem, ea iure facere placeat praesentium
                            aspernatur fugiat ab possimus? Minima. Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Aliquam error eum id inventore velit,
                            laborum consequatur, unde obcaecati est exercitationem, ea iure facere
                            placeat praesentium aspernatur fugiat ab possimus? Minima.
                        </div>
                    </div>
                </Wrapper>
            </div>
            <Wrapper classes="mobile:bg-primary-background-color mobile:dark:bg-neutral-black-light mobile:pt-0">
                <p className="mobile:text-neutral-black-dark desktop:body1 body2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ipsam excepturi
                    blanditiis similique architecto cumque quas eum ducimus. Repudiandae rerum
                    corrupti iure molestiae temporibus quaerat placeat repellat harum unde
                    voluptatibus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. In quasi
                    unde repudiandae cum laboriosam, animi nemo doloribus suscipit possimus nisi? Ex
                    molestiae quas vitae beatae nulla, quidem suscipit veniam minima? Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Culpa, quia. Itaque aliquam
                    corrupti expedita ipsam minus eos labore quaerat culpa. Consectetur laboriosam
                    neque sunt illo perferendis, placeat velit cumque minus! Lorem ipsum dolor sit,
                    amet consectetur adipisicing elit. Ipsa, totam optio nihil vitae consectetur
                    molestias voluptatibus laudantium possimus deleniti itaque non repellendus eius
                    porro voluptatum est ducimus nobis ea. Architecto?
                </p>
            </Wrapper>
        </div>
    );
};

export default Home;
