import useWindowSize from '../../hooks/useWindowsSize';
import { SingleTaskInterface } from '../../interfaces/interfaces';
import SingleTaskMobile from './SingleTaskMobile/SingleTaskMobile';
import SingleTaskPc from './SingleTaskPc/SingleTaskPc';

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
        <div className="block semiSm:hidden ">
          <SingleTaskMobile content={content} index={index} />
        </div>
      )}
    </div>
  );
};

export default SingleTaskContainer;
