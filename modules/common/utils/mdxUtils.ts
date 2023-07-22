import fs from 'fs';
import remarkEmbedder from '@remark-embedder/core';
import { bundleMDX } from 'mdx-bundler';
import {
    YoutubeTransformer,
    DropboxTransformer,
    VideoTransformer
} from '../remark-embedder/Embedder';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import { MDModel } from '../models/MDXModel';

export const getMDData = async <T>(filePath: string): Promise<MDModel<T>> => {
    const source = fs.readFileSync(filePath, 'utf8');
    const { code, frontmatter } = await bundleMDX({
        source,
        cwd: process.cwd(),
        mdxOptions(options) {
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                [rehypeHighlight, rehypeSanitize]
            ];
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                [
                    remarkEmbedder,
                    { transformers: [YoutubeTransformer, DropboxTransformer, VideoTransformer] }
                ]
            ];
            return options;
        }
    });
    return { code, frontmatter: <T>frontmatter };
};

// The functions get all the slugs from a folder to create static paths during build time.
export const getSlugs = (folder: string): string[] => {
    const subFolderNames = fs.readdirSync(folder);
    return subFolderNames.map((subFolder) => {
        const parts = subFolder.split('/');
        const fileName = parts[parts.length - 1];
        const [slug, _ext] = fileName.split('.');
        return slug;
    });
};
