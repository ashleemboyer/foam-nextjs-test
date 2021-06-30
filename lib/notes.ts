import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';
import { Slug } from '~types/slug';

export const getNoteContent = async (slug: string) => {
  const filepath = path.join(process.cwd(), 'notes', `${slug}.md`);
  const fileContents = fs.readFileSync(filepath, 'utf8');

  const { data, content } = matter(fileContents);
  const { contents } = await unified().use(markdown).use(html).process(content);

  return { content: contents, frontmatter: data };
};

export const getNoteSlugs = () => {
  const slugs: Slug[] = [];
  const notesDirectory = path.join(process.cwd(), 'notes');
  const filenames = fs.readdirSync(notesDirectory);

  filenames.forEach((filename) => {
    // Ignoring subdirectories
    if (fs.lstatSync(`notes/${filename}`).isDirectory()) {
      return;
    }

    const filenameWithoutExtension = filename.slice(0, -3);
    const slug = `/notes/${filenameWithoutExtension}`;
    slugs.push({ label: filenameWithoutExtension, slug });
  });

  return slugs;
};
