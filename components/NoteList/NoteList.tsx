"use client";

import Link from "next/link";
import css from "./NoteList.module.css";
import type { Note } from "@/types/note";
import useDeleteNote from "@/hooks/useDeleteNote";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const { mutate: deleteNote, isPending } = useDeleteNote();

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link href={`/notes/${id}`} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => deleteNote(id)}
              disabled={isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
