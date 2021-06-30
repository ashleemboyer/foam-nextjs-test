import { GetStaticProps } from 'next';
import { getNoteSlugs } from '~lib/notes';
import { Slug } from '~types/slug';

interface Props {
  slugs: Slug[];
}

const NotesIndex = ({ slugs }: Props) => (
  <>
    <h1>Notes Index</h1>
    <nav>
      <ul>
        {slugs.map(({ label, slug }) => (
          <li key={slug}>
            <a href={slug}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const slugs = getNoteSlugs();

  return {
    props: {
      slugs,
    },
  };
};

export default NotesIndex;
