import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoTableRow from "./TodoTableRow";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";

function TodoTable() {
  const [activeTask, setActiveTask] = useState(0);
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  useEffect(function () {
    const getTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();

        if (!data || data.status !== "success")
          throw new Error("Oops Something went wrong!!");
        console.log(data);
        setTasks(data.data.tasks);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    };

    getTasks();
  }, []);

  return (
    <div className="flex w-full max-w-4xl flex-col justify-center gap-8">
      <h1 className="mb-8 text-center text-6xl uppercase text-white">
        Your Todo&apos;s
      </h1>
      <Link to="/createTask" className="self-end">
        <button className="flex items-center gap-4  rounded-md border-2 p-4 text-2xl text-white">
          <span>Create Task</span>
          <IoMdAdd className="h-6 w-6" />
        </button>
      </Link>
      <div className="flex flex-col items-center gap-4">
        <div className="grid w-full max-w-4xl grid-cols-[minmax(0,0.7fr),minmax(0,1.5fr),repeat(2,minmax(0,1fr)),repeat(2,80px)] items-center gap-8 rounded-2xl border-[3px] border-white px-4 py-6">
          <p className="text-2xl font-semibold text-slate-400">Task Id</p>
          <p className="text-center text-2xl font-semibold text-slate-400">
            Title
          </p>
          <p className="text-center text-2xl font-semibold text-slate-400">
            Due Date
          </p>
          <p className="text-center text-2xl font-semibold text-slate-400">
            Status
          </p>
          <p className="text-center text-2xl font-semibold text-slate-400">
            Edit
          </p>
          <p className="text-center text-2xl font-semibold text-slate-400">
            Delete
          </p>
        </div>

        {tasks.map((task, ind) => (
          <TodoTableRow
            key={ind}
            active={activeTask}
            onActive={setActiveTask}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoTable;
