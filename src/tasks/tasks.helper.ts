export interface ITask {
  text: string;
  date: string;
  subLevel: number;
  parentId: string;
}

export const groupTasksByParentId = (tasks: ITask[]) => {
  const taskMap = {};
  tasks.forEach((task: ITask) => {
    if (!taskMap[task.parentId]) {
      taskMap[task.parentId] = [];
    }
    taskMap[task.parentId].push(task);
  });
  return taskMap;
};

export function transformIdToUnderscoreId<T extends { id: string }>(
  data: T | T[],
): (Omit<T, 'id'> & { _id: string }) | (Omit<T, 'id'> & { _id: string })[] {
  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      _id: item.id,
      id: undefined,
    }));
  } else {
    return {
      ...data,
      _id: data.id,
      id: undefined,
    };
  }
}
