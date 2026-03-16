import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import {
  addTaskToList,
  getAllTasks,
  deleteTaskFromList,
  updateTaskStatusById,
  updateTaskById,
} from "../database/db";
import "./MainPage.css";

export function MainPage() {
  const [taskList, setTaskList] = useState([]);
  const [taskInInputField, setTaskInInputField] = useState("");
  const [helper, setHelper] = useState(true);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  function updateInputField(event) {
    setTaskInInputField(event.target.value);
  }
  function setTaskInDB() {
    if (!taskInInputField) return;
    addTaskToList(taskInInputField);
    setTaskInInputField("");
    helper ? setHelper(false) : setHelper(true);
  }
  function deleteSelectedItem() {
    if (!selectedDiv) return;
    deleteTaskFromList(selectedDiv);
    helper ? setHelper(false) : setHelper(true);
  }
  function updateTaskStatus() {
    updateTaskStatusById(selectedDiv);
    helper ? setHelper(false) : setHelper(true);
  }
  function updateTask(selectedDiv, editedTask) {
    updateTaskById(selectedDiv, editedTask);
    helper ? setHelper(false) : setHelper(true);
  }

  useEffect(() => {
    async function getTaskListFromDB() {
      const tasksListFromDB = await getAllTasks();
      setTaskList(tasksListFromDB);
    }
    getTaskListFromDB();
  }, [helper]);

  return (
    <div className="main-container">
      <Header />

      <div className="page-container">
        <div className="input-container">
          <input
            className="to-do-input"
            placeholder="Enter what to do"
            value={taskInInputField}
            onChange={updateInputField}
          />
        </div>

        <div className="add-btn-container ">
          <button
            className="btn add-btn"
            onClick={setTaskInDB}
            disabled={taskInInputField ? false : true}
          >
            Add
          </button>
        </div>

        <div className="list-items-container">
          {taskList &&
            taskList.map((tsk) => {
              const taskStyle =
                selectedDiv === tsk.taskId
                  ? {
                      backgroundColor: "#EEF2FF",
                      border: "1px solid #6366F1",
                      color: "#3730A3",
                    }
                  : tsk.isComplete
                    ? {
                        backgroundColor: "#ECFDF5",
                        border: "1px solid #10B981",
                        color: "#065F46",
                        textDecoration: "line-through",
                        textDecorationColor: "#10B981",
                      }
                    : {
                        backgroundColor: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        color: "#1E293B",
                      };

              return (
                <div
                  key={tsk.taskId}
                  className={`list-item ${tsk.isComplete ? "complete" : "uncomplete"}`}
                  onClick={() => {
                    if (selectedDiv === tsk.taskId) {
                      setSelectedDiv(null);
                      selectedTask(null);
                    } else {
                      setSelectedDiv(tsk.taskId);
                      setSelectedTask(tsk);
                    }
                  }}
                  style={taskStyle}
                >
                  <button
                    title={`Mark as ${tsk.isComplete ? "Uncomplete" : "Complete"}`}
                    className="mark-btn"
                    onClick={updateTaskStatus}
                  >
                    {tsk.isComplete ? "❎" : "✅"}
                  </button>
                  {tsk.task}
                </div>
              );
            })}
        </div>

        <div className="edit-delete-bts-container">
          <button
            className="btn edit-btn"
            disabled={selectedDiv ? false : true}
            onClick={() => {
              console.log(selectedTask);

              const editedTask = window.prompt(
                "Enter task to edit or cancel to keep current task:",
              );
              if (editedTask) {
                updateTask(selectedDiv, editedTask);
              } else return;
            }}
          >
            Edit
          </button>
          <button
            className="btn delete-btn"
            disabled={selectedDiv ? false : true}
            onClick={() => {
              window.confirm("Nakki delete karych ahe???")
                ? deleteSelectedItem()
                : "";
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
