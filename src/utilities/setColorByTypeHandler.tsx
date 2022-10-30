import { SingleTaskInterface } from '../interfaces/interfaces';

export const setCardColorByTypeHandler = (
  isBg: boolean,
  content: SingleTaskInterface,
) => {
  if (content?.taskType === 'personal') {
    return isBg ? 'bg-green-400' : 'border-green-400';
  }
  if (content?.taskType === 'work') {
    return isBg ? 'bg-blue-400' : 'border-blue-400';
  }
  if (content?.taskType === 'fun') {
    return isBg ? 'bg-purple-400' : 'border-purple-400';
  }
  if (content?.taskType === 'gym') {
    return isBg ? 'bg-pink-400' : 'border-[#FF72B6]';
  }
  if (content?.taskType === 'friends') {
    return isBg ? 'bg-teal-400' : 'border-[#2dd4bf]';
  }
  if (content?.taskType === 'shopping') {
    return isBg ? 'bg-[#F88379] ' : 'border-[#F88379]';
  }
  if (content?.taskType === 'nature') {
    return isBg ? 'bg-emerald-500' : 'border-[#10b981]';
  }
};
