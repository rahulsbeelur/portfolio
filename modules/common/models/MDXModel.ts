export interface MDModel<T = void> {
    code: string;
    frontmatter: T;
    slug?: string;
}
