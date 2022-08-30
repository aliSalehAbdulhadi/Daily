import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import MileStoneForm from '../../src/components/Forms/MileStoneForm/MileStoneForm';
import MilestoneSinglePage from '../../src/components/MilestoneSinglePage/MilestoneSinglePage';
import ProgressBar from '../../src/components/progressBar/ProgressBar';
import Swipeable from '../../src/components/swipeable/Swipeable';
import useClickOutside from '../../src/hooks/useClickOutside';
import {
  RootState,
  SingleTodoInterface,
  useAppSelector,
  useAppDispatch,
} from '../../src/interfaces/interfaces';
import { deleteMilestoneLocally } from '../../src/redux/slices/features/getTodoSlice';
import { deleteMilestone } from '../../src/redux/slices/features/MilestonesSlice';

const MileStone = () => {
  const router = useRouter();
  const { id } = router.query;
  const [addMilestone, setAddMilestone] = useState<boolean>(false);
  const [deleteAnimation, setDeleteAnimation] = useState<{
    animation: boolean;
    deletedMilestoneId: string;
  }>({
    animation: false,
    deletedMilestoneId: '',
  });

  const [plusIcon, setPlusIcon] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const todo = todos?.find((todo) => todo?.id === id);
  const milestoneRef = useClickOutside(() => {
    setAddMilestone(false);
  });
  const plusRef = useClickOutside(() => {
    setPlusIcon(false);
  });

  const milestoneCompleted = todo?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  ).length;
  const percentage =
    milestoneCompleted && todo.milestones.length > 0
      ? Math.round((milestoneCompleted / todo?.milestones?.length) * 100)
      : 0;
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  const deleteMilestoneHandler = (milestone: any) => {
    setDeleteAnimation({
      animation: true,
      deletedMilestoneId: milestone.id,
    });
    setTimeout(() => {
      setDeleteAnimation({
        animation: false,
        deletedMilestoneId: milestone.id,
      });
      dispatch(
        deleteMilestone({
          milestone: milestone,
          userUid: user,
          todoId: todo?.id,
          allTodos: todos,
        }),
      );
      dispatch(
        deleteMilestoneLocally({
          milestoneId: milestone?.id,
          todoId: todo?.id,
        }),
      );
    }, 500);
  };

  return (
    <div
      className={`font-Comfortaa transition-all text-sm ${
        dark ? 'bg-secondaryColor' : 'bg-secondaryLight'
      }`}
    >
      <div className="flex flex-col font-Comfortaa ">
        <div
          className={`${
            dark ? 'bg-primaryColor' : 'bg-secondaryLight'
          } scrollBar text-white min-h-[90vh] transition-all`}
        >
          <div className=" flex flex-col">
            <div
              className={`mb-7 flex items-center justify-center py-4 w-full ${
                dark ? 'bg-secondaryColor' : 'bg-primaryColor'
              }`}
            >
              <div className=" w-[85%] sm:w-[95%]">
                <h1 className="text-textDark mr-2 ml-3">{todo?.content}</h1>
              </div>
              <div className="sm:w-[7%]">
                <div className="h-[3rem] w-[3rem] lg:h-[4rem] lg:w-[4rem]">
                  {todo && todo?.milestones.length > 0 ? (
                    <ProgressBar percentage={percentage} />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mx-3 flex flex-col items-center">
              <div className="w-full">
                {todo?.milestones.map((milestone: any, i) => {
                  return (
                    <Swipeable
                      key={milestone?.id}
                      handler={() => deleteMilestoneHandler(milestone)}
                    >
                      <MilestoneSinglePage
                        taskId={id}
                        milestone={milestone}
                        index={i}
                        todos={todos}
                        setDeleteAnimationMobile={deleteAnimation}
                      />
                    </Swipeable>
                  );
                })}
              </div>
              <div
                className={`${addMilestone ? 'block' : 'hidden'}`}
                ref={milestoneRef}
              >
                <MileStoneForm taskId={id} />
              </div>

              <div
                ref={plusRef}
                onMouseEnter={() => setPlusIcon(true)}
                onMouseLeave={() => setPlusIcon(false)}
                onClick={() => {
                  setAddMilestone(true);
                  setPlusIcon(false);
                }}
                className={`self-center cursor-pointer my-10 `}
              >
                {plusIcon ? (
                  <BsPlusCircleFill
                    fill="white"
                    className={`h-8 w-8  transition-all ${
                      addMilestone ? 'hidden' : 'block'
                    }`}
                  />
                ) : (
                  <BsPlusCircle
                    fill="white"
                    className={`h-8 w-8   transition-all ${
                      addMilestone ? 'hidden' : 'block'
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileStone;
