import { useState, useCallback } from "react";

interface UseConfirmDeleteReturn {
  confirmDialogOpen: boolean;
  selectedDeleteId: string | null;
  isDeleting: boolean;
  openConfirmDialog: (id: string) => void;
  closeConfirmDialog: () => void;
  confirmDelete: (onDelete: (id: string) => void | Promise<void>) => void;
}

export const useConfirmDelete = (): UseConfirmDeleteReturn => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openConfirmDialog = useCallback((id: string) => {
    setSelectedDeleteId(id);
    setConfirmDialogOpen(true);
  }, []);

  const closeConfirmDialog = useCallback(() => {
    setConfirmDialogOpen(false);
    setSelectedDeleteId(null);
  }, []);

  const confirmDelete = useCallback(
    async (onDelete: (id: string) => void | Promise<void>) => {
      if (!selectedDeleteId) return;

      setIsDeleting(true);
      try {
        await onDelete(selectedDeleteId);
        closeConfirmDialog();
      } catch (error) {
        console.error("Delete error:", error);
      } finally {
        setIsDeleting(false);
      }
    },
    [selectedDeleteId, closeConfirmDialog]
  );

  return {
    confirmDialogOpen,
    selectedDeleteId,
    isDeleting,
    openConfirmDialog,
    closeConfirmDialog,
    confirmDelete,
  };
};
