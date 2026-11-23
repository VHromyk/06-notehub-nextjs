"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";
import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import type { NoteData } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import useCreateNote from "@/hooks/useCreateNote";

export default function NotesClient() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes({ page, query }),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { mutate: createNote } = useCreateNote({ onSuccess: closeModal });

  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  const handleCreateNote = (note: NoteData) => {
    createNote(note);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading, please wait...</p>}

      {isError && <p>Something went wrong.</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.notes.length === 0 && <p>No notes found.</p>}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} onSubmit={handleCreateNote} />
        </Modal>
      )}

      <Toaster />
    </div>
  );
}
