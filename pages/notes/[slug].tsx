import { GetStaticPaths, GetStaticProps } from 'next';
import { getNoteContent, getNoteSlugs } from '~lib/notes';

interface Props {
  content: string;
  frontmatter: any; // TODO define this interface
}

const Note = ({ content, frontmatter }: Props) => (
  <>
    <h1>{frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getNoteSlugs();

  return {
    paths: slugs.map(({ label }) => ({ params: { slug: label } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, frontmatter } = await getNoteContent(params?.slug as string);

  return {
    props: {
      content,
      frontmatter,
    },
  };
};

export default Note;
