import React from 'react';
import { Link } from 'react-router';
interface FileInfoProps {
  file: any;
  writtenBy: string[];
  avatar: string[];
  logline: string;
  theme: string;
  genre: string[];
  children?: React.ReactNode;
}

const FileInfo = ({
  file,
  writtenBy,
  logline,
  theme,
  genre,
  children,
  avatar
}: FileInfoProps) => {
  console.log(file);
  
  return (
    <Link to={`/file/${file?._id}/screenplay`} state={{ fileDetails: file }}>
      <section className="text-sm flex flex-col gap-3 pr-6">
        <p className="text-[#252C34] font-medium text-xs">
          <span className="text-[#9999A0] font-medium text-xs">
            Written by:{' '}
          </span>{' '}
          {avatar?.map((user, index) => (
        <span key={index}>
          {user.username}
          {index < avatar?.length - 1 && ', '}
        </span>
      ))}
        </p>
        <p className="text-[#252C34] font-medium text-xs text-justify">
          <span className="text-[#9999A0] font-medium text-xs">Logline: </span>{' '}
          {logline}
        </p>
        <p className="text-[#252C34] font-medium text-xs text-justify">
          <span className="text-[#9999A0] font-medium text-xs">Type: </span>{' '}
          {file?.typeOfCreation||""}
        </p>
        <p className="text-[#252C34] font-medium text-xs">
          <span className="text-[#9999A0] font-medium text-xs">Theme: </span>{' '}
          {theme}
        </p>
        <p className="text-[#252C34] font-medium text-xs">
          <span className="text-[#9999A0] font-medium text-xs">Genre: </span>{' '}
          {genre.join(', ')}
        </p>

        {children}
      </section>
    </Link>
  );
};

export default FileInfo;
