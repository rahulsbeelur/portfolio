import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { ProjectCard } from '../../modules/projects/components/ProjectCard';

const Projects = (): JSX.Element => {
    return (
        <Wrapper classes="bg-primary-background-color dark:bg-neutral-black-light normal-case">
            <div className="mx-auto max-w-[2560px] desktop:mt-[138px] tablet:mt-[128px] mt-24 h5">
                <div className="flex justify-center">
                    <div className="mt-auto mb-auto desktop:w-5 desktop:h-5 w-4 h-4 bg-[#696969]"></div>
                    <div className="text-center ml-2 text-neutral-black-darker">Projects</div>
                </div>
                {ProjectCard()}
            </div>
        </Wrapper>
    );
};

export default Projects;
