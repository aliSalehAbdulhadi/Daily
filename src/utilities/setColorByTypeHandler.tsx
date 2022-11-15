import { SingleTaskInterface } from '../interfaces/interfaces';

export const setCardColorByTypeHandler = (isBg: boolean, taskType: string) => {
  if (taskType === 'green-4') {
    return isBg ? 'bg-green-400' : 'border-green-400';
  }
  if (taskType === 'blue-4') {
    return isBg ? 'bg-blue-400' : 'border-blue-400';
  }
  if (taskType === 'purple-4') {
    return isBg ? 'bg-purple-400' : 'border-purple-400';
  }
  if (taskType === 'amber-2') {
    return isBg ? 'bg-amber-200' : 'border-[#10b981]';
  }
  if (taskType === 'pink-4') {
    return isBg ? 'bg-pink-400' : 'border-[#FF72B6]';
  }
  if (taskType === 'teal-4') {
    return isBg ? 'bg-teal-400' : 'border-[#2dd4bf]';
  }
  if (taskType === 'salmon') {
    return isBg ? 'bg-[#e28780] ' : 'border-[#F88379]';
  }
  if (taskType === 'emerald-5') {
    return isBg ? 'bg-emerald-500' : 'border-[#10b981]';
  }
};
