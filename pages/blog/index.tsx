import { Wrapper } from '../../modules/common/components/Wrapper';

const BlogPage = (): JSX.Element => {
    return (
        <Wrapper classes="bg-primary-background-color dark:bg-neutral-black-light normal-case">
            <div className="mt-[100px] h-[400px] flex flex-col justify-center align-middle h4 text-center mobile:h5 gap-4">
                <div>404: Blog not found yet</div>
                <div className="h6 mobile:sub-headline2">Compiling thoughts. Stay tuned!</div>
            </div>
        </Wrapper>
    );
};

export default BlogPage;
