import React from 'react';
import CodingInProgress from '@/assets/coding-in-progress.svg';
import TestingInProgress from '@/assets/testing-in-progress.svg';
import StabalizationInProgress from '@/assets/stabilization-in-progress.svg';
const WorkflowIllustrators = () => {
  return (
    <div className='flex gap-5 justify-around w-[80%] items-center mx-auto mt-4 '>
      <img alt='Coding-in-progress' src={CodingInProgress}></img>
      <img alt='Testing-in-progress' src={TestingInProgress}></img>
      <img alt='Stabalization-in-progress' src={StabalizationInProgress}></img>
    </div>
  );
};

export default WorkflowIllustrators;
