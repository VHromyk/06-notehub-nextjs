import axios from "axios";
import type { Note, NoteData } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  query?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

const http = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async ({
  query,
  tag,
  page = 1,
  perPage = 12,
  sortBy = "created",
}: FetchNotesParams = {}): Promise<NotesResponse> => {
  const { data } = await http.get<NotesResponse>("/notes", {
    params: { search: query || undefined, page, tag, perPage, sortBy },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await http.get<Note>(`/notes/${id}`);

  return data;
};

export const createNote = async (note: NoteData): Promise<Note> => {
  const { data } = await http.post<Note>("/notes", note);

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await http.delete<Note>(`/notes/${id}`);

  return data;
};
