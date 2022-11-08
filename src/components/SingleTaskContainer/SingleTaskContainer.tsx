import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import useWindowSize from '../../hooks/useWindowsSize';
import { SingleTaskInterface } from '../../interfaces/interfaces';
import LoadingCard from '../loadingCard/LoadingCard';
import SingleTaskPc from './SingleTaskPc/SingleTaskPc';
const SingleTaskMobile = dynamic(
  () => import('./SingleTaskMobile/SingleTaskMobile'),
  {
    suspense: true,
  },
);
const SingleTaskContainer = ({
  content,
  index,
  taskId,
  defaultTaskId,
}: {
  content: SingleTaskInterface;
  index: number;
  taskId: string;
  defaultTaskId?: string;
}) => {
  const width = useWindowSize();

  return (
    <div>
      {width >= 840 ? (
        <div className="hidden semiSm:block">
          <SingleTaskPc
            content={content}
            index={index}
            taskId={taskId}
            defaultTaskId={defaultTaskId}
          />
        </div>
      ) : (
        <Suspense fallback={<LoadingCard />}>
          <div className="block semiSm:hidden ">
            <SingleTaskMobile content={content} index={index} />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default SingleTaskContainer;
