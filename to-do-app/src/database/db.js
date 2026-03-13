export function addTaskToList(newTask) {
  const newTaskId = crypto.randomUUID();
  const newT = { taskId: newTaskId, task: newTask, isComplete: false };

  let tasksList = [];
  let strList;
  const isEmptyDB = localStorage.getItem("taskList");

  if (!isEmptyDB) {
    tasksList.push(newT);
    strList = JSON.stringify(tasksList);
    localStorage.setItem("taskList", strList);
  } else {
    strList = localStorage.getItem("taskList");
    tasksList = JSON.parse(strList);
    tasksList.push(newT);
    strList = JSON.stringify(tasksList);
    localStorage.setItem("taskList", strList);
  }
}

export async function getAllTasks() {
  let tasksList = [];
  let strList;
  const isEmptyDB = localStorage.getItem("taskList");

  if (!isEmptyDB) {
    return null;
  } else {
    strList = localStorage.getItem("taskList");
    tasksList = JSON.parse(strList);
    return tasksList;
  }
}

export function deleteTaskFromList(tId) {
  let tasksList = [];
  let strList;
  const isEmptyDB = localStorage.getItem("taskList");

  if (!isEmptyDB) {
    return null;
  } else {
    strList = localStorage.getItem("taskList");

    tasksList = JSON.parse(strList);

    const newTasksList = tasksList.filter((task) => {
      return task.taskId !== tId;
    });

    strList = JSON.stringify(newTasksList);

    localStorage.setItem("taskList", strList);
  }
}

export function updateTaskStatusById(tId) {
  let tasksList = [];
  let strList;
  const isEmptyDB = localStorage.getItem("taskList");

  if (!isEmptyDB) {
    return null;
  } else {
    strList = localStorage.getItem("taskList");

    tasksList = JSON.parse(strList);

    const newTasksList = tasksList.map((task)=>{
      if (task.taskId !== tId) {
        return task;        
      } else {
        task.isComplete = !task.isComplete;
        return task;
      }
    })

    strList = JSON.stringify(newTasksList);

    localStorage.setItem("taskList", strList);
  }
}

export function updateTaskById(tId, tTask) {
  let tasksList = [];
  let strList;
  const isEmptyDB = localStorage.getItem("taskList");

  if (!isEmptyDB) {
    return null;
  } else {
    strList = localStorage.getItem("taskList");

    tasksList = JSON.parse(strList);

    const newTasksList = tasksList.map((task)=>{
      if (task.taskId !== tId) {
        return task;        
      } else {
        task.task = tTask;
        return task;
      }
    })

    strList = JSON.stringify(newTasksList);

    localStorage.setItem("taskList", strList);
  }
}
