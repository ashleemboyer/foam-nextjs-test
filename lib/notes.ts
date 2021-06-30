import fs from 'fs';
import path from 'path';
import { Slug } from '~types/slug';

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
