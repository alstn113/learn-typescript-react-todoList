import "./App.css";
import { useState, ChangeEvent } from "react";
import { ITask } from "./interface";
import TodoTask from "./components/TodoTask";
function App() {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  }

  function addTask(): void {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  }
  function completeTast(taskNameToDelete: string): void {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  }
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input type="text" placeholder="Task..." name="task" value={task} onChange={handleChange} />
          <input type="number" placeholder="Deadline (in days)..." name="deadline" value={deadline} onChange={handleChange} />
        </div>
        <button onClick={addTask}>ADD TASK</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask task={task} completeTask={completeTast} key={key} />;
        })}
      </div>
    </div>
  );
}

export default App;
