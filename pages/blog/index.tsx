import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';

const BlogPage = (): JSX.Element => {
    return (
        <Wrapper classes="engineer-grid normal-case">
            <SEO
                title="Blog | Rahul S Beelur"
                description="Draft notes and future writing from Rahul S Beelur on software development, product engineering, and practical technical decisions."
                path="/blog"
                noIndex
            />
            <div className="mt-[100px] h-[400px] flex flex-col justify-center align-middle h4 text-center mobile:h5 gap-4">
                <div className="font-robotoMono text-sm text-accent">blog build pending</div>
                <div>404: Notes not published yet</div>
                <div className="h6 mobile:sub-headline2 text-muted">Drafts are compiling locally.</div>
            </div>
        </Wrapper>
    );
};

export default BlogPage;
