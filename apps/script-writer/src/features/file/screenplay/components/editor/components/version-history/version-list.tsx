import { editorSelectors, useEditorStore } from '@/store/editor';
import React from 'react';
import VersionCard from './version-card';

const VersionHistoryList = () => {
  const versionHistory = useEditorStore(editorSelectors.versionHistory);
  return (
    <div>
      {versionHistory?.map((el, i) => (
        <VersionCard key={el?.user?._id + i} {...el} index={i} />
      ))}
    </div>
  );
};

export default VersionHistoryList;
