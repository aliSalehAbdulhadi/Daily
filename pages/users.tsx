import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { IoMdLogOut } from 'react-icons/io';
import {
  RootState,
  SingleTodoInterface,
  useAppSelector,
} from '../src/interfaces/interfaces';
import ChangeUserName from '../src/components/modals/changeUserName/changeUserName';
import ConfirmLogOut from '../src/components/modals/confirmLogOut/ConfirmLogOut';
import ResetPassword from '../src/components/modals/resetPassword/ResetPassword';
import SingleTask from '../src/components/SingleTask/SingleTask';

const User = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);

  const userName = useAppSelector(
    (state: RootState) => state.getTodoReducer.userName,
  );
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );

  return (
    <div className={`h-screen outline-none bg-primaryColor `}>
      <div className="bg-secondaryColor flex items-center mx-10 rounded pb-10">
        <div className="w-[65%] flex flex-col  scrollBar">
          <div className="mt-10 w-[80%] flex flex-col items-center rounded  h-[80vh]  ">
            <h1 className="text-textDark select-none mt-10">Completed Tasks</h1>

            <div className="mt-5 border-[1px] w-[90%] rounded scroll-m-40 overflow-auto scrollBar">
              <Droppable droppableId="CompletedTodos">
                {(provided) => (
                  <div
                    className=" flex flex-col items-center font-Comfortaa font-bold "
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="">
                      {todos?.map((todo: SingleTodoInterface, index: number) =>
                        todo.completed ? (
                          <SingleTask
                            key={todo?.id}
                            content={todo}
                            index={index}
                          />
                        ) : (
                          false
                        ),
                      )}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>

        <div className=" w-[35%] flex items-center justify-center h-[80vh]  text-white">
          <div>
            <h1 className=" font-Comfortaa text-2xl">{userName}</h1>
            <div className="flex flex-col items-center">
              <button
                className="bg-primaryColor self-start mb-5 py-2 px-4 rounded text-white text-sm font-light "
                onClick={() => setOpenChangePasswordModal(true)}
              >
                Change user name
                <ChangeUserName
                  setOpen={setOpenChangePasswordModal}
                  open={openChangePasswordModal}
                />
              </button>
              <button
                className="bg-primaryColor self-start mb-5 py-2 px-4 rounded text-white text-sm font-light "
                onClick={() => setOpenPasswordModal(true)}
              >
                Change password
                <ResetPassword
                  setOpen={setOpenPasswordModal}
                  open={openPasswordModal}
                />
              </button>
            </div>
            <button
              className="flex flex-col items-center justify-center bg-primaryColor px-2  rounded text-white text-sm "
              onClick={() => setOpenModal(true)}
            >
              <IoMdLogOut
                title="Log Out"
                className={`scale-[1.8] cursor-pointer mb-[1rem] transition-all ease-in-out duration-500 hover:rotate-[-90deg] ${
                  openModal ? 'rotate-[-90deg]' : ''
                }`}
              />
              Log out
              <ConfirmLogOut setOpen={setOpenModal} open={openModal} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
