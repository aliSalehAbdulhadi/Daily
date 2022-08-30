import useWindowSize from '../../hooks/useWindowsSize';
import { SingleTodoInterface } from '../../interfaces/interfaces';

import SingleTaskMobile from './SingleTaskMobile/SingleTaskMobile';
import SingleTaskPc from './SingleTaskPc/SingleTaskPc';

const SingleTaskContainer = ({
  content,
  index,
  taskId,
}: {
  content: SingleTodoInterface;
  index: number;
  taskId: string;
}) => {
  const width = useWindowSize();

  return (
    <div>
      {width >= 840 ? (
        <div className="hidden semiSm:block">
          <SingleTaskPc content={content} index={index} taskId={taskId} />
        </div>
      ) : (
        <div className="block semiSm:hidden ">
          <SingleTaskMobile content={content} index={index} />
        </div>
      )}
    </div>
  );
};

export default SingleTaskContainer;
