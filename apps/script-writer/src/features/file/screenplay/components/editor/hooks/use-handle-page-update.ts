import {
  calculateTotalPagesFromScenes,
  getTotalHeightOfScenes,
} from '@/features/scene-list/helper';
import { Editor } from '@tiptap/react';
import { IScene } from '@/types/scenes';
import { UseMutateFunction, UseQueryResult } from '@tanstack/react-query';
import { File } from '@/types/api';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  fileQuery: UseQueryResult<
    {
      file: File;
    },
    Error
  >;
  scenes: IScene[];
  handleFileCurrentPage: UseMutateFunction<
    void,
    Error,
    {
      fileId: string;
      pages: number;
    },
    unknown
  >;
  fileId: string;
};

export const useHandlePageUpdate = ({
  fileQuery,
  scenes,
  handleFileCurrentPage,
  fileId,
}: Props) => {
  const handlePageUpdate = useDebouncedCallback((editor: Editor) => {
    if (!editor) return;
    if (!editor?.$doc?.content) return;
    const scenesHeight = getTotalHeightOfScenes(editor, 'p')
      .sceneHeightArr as number[];
    if (!scenesHeight.length) return;
    let totalPages = 0;
    const currentPage = fileQuery.data?.file.currentPage || 0;
    scenes.forEach((scene, index) => {
      const height = scenesHeight[index];
      const pages = calculateTotalPagesFromScenes(height);
      totalPages += pages;
    });

    if (totalPages !== currentPage) {
      handleFileCurrentPage({
        fileId: fileId || '',
        pages: totalPages,
      });
    }
  }, 500);

  return { handlePageUpdate };
};
