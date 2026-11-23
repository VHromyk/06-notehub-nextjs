import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteNote } from "@/lib/api";

const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: (note) => {
      toast.success(`Note "${note.title}" removed`);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => toast.error("Failed to delete note"),
  });
};

export default useDeleteNote;
