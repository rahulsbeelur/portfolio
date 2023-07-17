import Image from 'next/image';
import { Wrapper } from '../modules/common/components/Wrapper';

const Home = (): JSX.Element => {
    return (
        <div className="flex flex-row w-full h-full">
            <div className="absolute desktop:w-[40%] tablet:w-[40%] bg-primary-background-color dark:bg-neutral-black-light h-full"></div>
            <div className="absolute desktop:w-[60%] tablet:w-[60%]"></div>
            <Wrapper classes="relative">
                <div className="pl-[250px] pr-[200px] pt-[100px] flex flex-row">
                    <div className="w-[400px] shadow-xl transform translate-z-30 bg-primary-background-color-lighter dark:bg-neutral-black-lighter text-neutral-black-darker p-10">
                        <div className="rounded-full overflow-hidden">
                            <Image
                                src="/personal-photo.png"
                                alt="personal image"
                                width={500}
                                height={500}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laborum
                            suscipit nostrum minima! Ipsam blanditiis quibusdam laudantium dolor
                            nulla minima assumenda, ducimus a, et nam ipsa quam perferendis?
                            Architecto, possimus.
                        </div>
                    </div>
                    <div></div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Home;
