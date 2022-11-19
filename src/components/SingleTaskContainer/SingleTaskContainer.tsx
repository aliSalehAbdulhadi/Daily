import { memo } from 'react';
import useWindowSize from '../../hooks/useWindowsSize';
import { SingleTaskInterface } from '../../interfaces/interfaces';
import { Tasks, UserKey } from '../../utilities/globalImports';
import SingleTaskMobile from './SingleTaskMobile/SingleTaskMobile';
import SingleTaskPc from './SingleTaskPc/SingleTaskPc';

const SingleTaskContainer = ({
  task,
  index,
  taskId,
}: {
  task: SingleTaskInterface;
  index: number;
  taskId: string;
}) => {
  const width = useWindowSize();

  return (
    <div>
      {width >= 840 ? (
        <div className="hidden semiSm:block transition-all">
          <SingleTaskPc
            task={task}
            tasks={Tasks()}
            index={index}
            taskId={taskId}
            user={UserKey()}
          />
        </div>
      ) : (
        <div className="block semiSm:hidden ">
          <SingleTaskMobile
            tasks={Tasks()}
            user={UserKey()}
            task={task}
            index={index}
          />
        </div>
      )}
    </div>
  );
};

export default memo(SingleTaskContainer);
