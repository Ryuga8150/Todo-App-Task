import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("TODO FORM");
  const handleUpdateTask = async () => {
    try {
      const formData = { title, description, date, status };
      console.log(formData);
      const res = await fetch(`/api/tasks/${id}`, {
        // Adding method type
        method: "PUT",
        // Adding body or contents to send
        body: JSON.stringify(formData),
        // Adding headers to the request
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (!data || data.status !== "success")
        throw new Error("Something Went Wrong!!!");
      toast.success("Task Created SuccessFully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setTitle("");
      setDescription("");
      setStatus("");
      setDate("");
    }
  };
  const handleCreateTask = async () => {
    try {
      const formData = { title, description, date, status };
      console.log(formData);
      const res = await fetch("/api/tasks", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(formData),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();

      if (!data || data.status !== "success")
        throw new Error("Something Went Wrong!!!");

      toast.success("Task Created SuccessFully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setTitle("");
      setDescription("");
      setStatus("");
      setDate("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !date) {
      toast.error("Incomplete Information Provided. Please Try Again!!!");
      return;
    }
    // You can handle form submission logic here

    if (id) {
      handleUpdateTask();
    } else {
      handleCreateTask();
    }
  };

  useEffect(
    function () {
      if (id) {
        const getTask = async () => {
          try {
            const res = await fetch(`/api/tasks/${id}`);
            const data = await res.json();

            if (!data || data.status !== "success")
              throw new Error("Oops Something went wrong!!");

            const task = data.data.task;

            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
            setDate(task.date);
          } catch (err) {
            console.log(err);
            toast.error(err.message);
          }
        };

        getTask();
      }
    },
    [id],
  );

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full max-w-md rounded-lg bg-white p-8">
        <h2 className="mb-4 text-center text-2xl font-semibold">Task Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="title"
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="description"
            >
              Description:
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="description"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="status"
            >
              Status:
            </label>
            <select
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="date"
            >
              Date:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              {id ? "UPDATE TASK" : "ADD TASK"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
