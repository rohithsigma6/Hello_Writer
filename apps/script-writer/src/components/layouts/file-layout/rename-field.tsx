import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFile } from "@/features/file/screenplay/api/get-file-by-id";
import { useRenameFile } from "@/features/dashboard/api/rename-file";

interface TextFieldProps {
  title: string;
  setTitle:any;
}

const TextField = ({ title ,setTitle }: TextFieldProps) => {

  return (
    <input
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      /*  class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} */
      className={`w-full overflow-scroll h-8 bg-transparent border-none focus:outline-none`}
      required
    />
  );
};

export default TextField;
