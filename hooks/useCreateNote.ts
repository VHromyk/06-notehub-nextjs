import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NoteData } from "@/types/note";
import { createNote } from "@/lib/api";

const useCreateNote = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoteData) => createNote(data),
    onSuccess: (note) => {
      toast.success(`Note "${note.title}" created`);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
    onError: () => toast.error("Failed to create note"),
  });
};

export default useCreateNote;
