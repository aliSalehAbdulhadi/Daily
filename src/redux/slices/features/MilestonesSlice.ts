import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTodoInterface } from '../../../interfaces/interfaces';

export const addMilestones = createAsyncThunk(
  'addMilestones/bookmark',
  async ({
    userUid,
    todoId,
    allTodos,
    milestone,
  }: {
    userUid: string;
    todoId: string;
    milestone: {
      id: string;
      milestoneContent: string;
      milestoneCompleted: boolean;
    };
    allTodos: SingleTodoInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        todos: allTodos.map((todo: SingleTodoInterface) =>
          todo.id === todoId
            ? {
                ...todo,
                milestones: [...todo.milestones, milestone],
              }
            : todo,
        ),
      },
    });
  },
);

export const completeMilestone = createAsyncThunk(
  'completeMilestone/bookmark',
  async ({
    userUid,
    todoId,
    allTodos,
    milestone,
  }: {
    userUid: string;
    todoId: any;
    milestone: {
      id: string;
      milestoneContent: string;
      milestoneCompleted: boolean;
    };
    allTodos: SingleTodoInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        todos: allTodos.map((todo: SingleTodoInterface) =>
          todo.id === todoId
            ? {
                ...todo,
                milestones: todo.milestones.map((ms: any) => {
                  if (ms.id === milestone.id) {
                    return {
                      ...ms,
                      milestoneCompleted: !ms.milestoneCompleted,
                    };
                  }
                  return ms;
                }),
              }
            : todo,
        ),
      },
    });
  },
);

export const deleteMilestone = createAsyncThunk(
  'deleteMilestone/bookmark',
  async ({
    userUid,
    todoId,
    allTodos,
    milestone,
  }: {
    userUid: string;
    todoId: any;
    milestone: {
      id: string;
      milestoneContent: string;
      milestoneCompleted: boolean;
    };
    allTodos: SingleTodoInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        todos: allTodos.map((todo: SingleTodoInterface) =>
          todo.id === todoId
            ? {
                ...todo,
                milestones: todo.milestones.filter((ms: any) => {
                  if (milestone.id === ms.id) {
                    return false;
                  } else {
                    return true;
                  }
                }),
              }
            : todo,
        ),
      },
    });
  },
);

export const editMilestone = createAsyncThunk(
  'editMilestone/bookmark',
  async ({
    userUid,
    todoId,
    allTodos,
    milestone,
    milestoneEdit,
  }: {
    userUid: string;
    todoId: any;
    milestone: {
      id: string;
      milestoneContent: string;
      milestoneCompleted: boolean;
    };
    milestoneEdit: string;
    allTodos: SingleTodoInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        todos: allTodos.map((todo: SingleTodoInterface) =>
          todo.id === todoId
            ? {
                ...todo,
                milestones: todo.milestones.map((ms: any) => {
                  if (ms.id === milestone.id) {
                    return {
                      ...ms,
                      milestoneContent: milestoneEdit,
                    };
                  }
                  return ms;
                }),
              }
            : todo,
        ),
      },
    });
  },
);
