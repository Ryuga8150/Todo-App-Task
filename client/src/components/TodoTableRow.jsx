import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

TodoTableRow.propTypes = {
  active: PropTypes.bool,
  onActive: PropTypes.func,
  task: PropTypes.object,
  onSetTasks: PropTypes.func,
};

function TodoTableRow({ task, active, onActive, onSetTasks }) {
  const navigate = useNavigate();

  async function handleDeleteTask() {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data || data.status !== "success")
        throw new Error(!data ? "Something Went Wrong!!!" : data.message);

      toast.success("Task Deleted SuccessFully");
      onSetTasks((tasks) =>
        tasks.filter((currTask) => currTask.id !== task.id),
      );
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <div
      className="flex w-full max-w-4xl flex-col items-center gap-2 rounded-2xl bg-slate-50/20 px-4 py-6"
      onClick={() => onActive(task.id)}
    >
      <div className="grid w-full  grid-cols-[minmax(0,0.7fr),minmax(0,1.5fr),repeat(2,minmax(0,1fr)),repeat(2,80px)] items-center justify-center gap-8   ">
        <p className="text-2xl font-semibold  text-white">{task.id}</p>
        <p className="text-center text-2xl font-semibold text-white">
          {task.title}
        </p>
        <p className="text-center text-2xl font-semibold text-white">
          {task.date}
        </p>
        <p className="text-center text-2xl font-semibold text-white">
          {task.status}
        </p>
        <div className="flex h-full w-full items-center justify-center">
          <FaEdit
            className="h-9 w-9 text-amber-700"
            onClick={() => navigate(`/updateTask/${task.id}`)}
          />
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <MdDelete
            className="h-9 w-9 text-red-900"
            onClick={handleDeleteTask}
          />
        </div>
      </div>
      {active === task.id && (
        <p className="self-start text-xl text-white/60">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          expedita, dicta accusantium ipsum fugiat quae veniam perferendis
        </p>
      )}
    </div>
  );
}

export default TodoTableRow;
