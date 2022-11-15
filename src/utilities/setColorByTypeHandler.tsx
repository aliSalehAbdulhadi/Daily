import { SingleTaskInterface } from '../interfaces/interfaces';

export const setCardColorByTypeHandler = (
  isBg: boolean,
  content: SingleTaskInterface,
) => {
  if (content?.taskType === 'green-4') {
    return isBg ? 'bg-green-400' : 'border-green-400';
  }
  if (content?.taskType === 'blue-4') {
    return isBg ? 'bg-blue-400' : 'border-blue-400';
  }
  if (content?.taskType === 'purple-4') {
    return isBg ? 'bg-purple-400' : 'border-purple-400';
  }
  if (content?.taskType === 'amber-2') {
    return isBg ? 'bg-amber-200' : 'border-[#10b981]';
  }
  if (content?.taskType === 'pink-4') {
    return isBg ? 'bg-pink-400' : 'border-[#FF72B6]';
  }
  if (content?.taskType === 'teal-4') {
    return isBg ? 'bg-teal-400' : 'border-[#2dd4bf]';
  }
  if (content?.taskType === 'salmon') {
    return isBg ? 'bg-[#F88379] ' : 'border-[#F88379]';
  }
  if (content?.taskType === 'emerald-5') {
    return isBg ? 'bg-emerald-500' : 'border-[#10b981]';
  }
};
