import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillDelete } from "react-icons/ai";
function App() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);
  const addTodo = () => {
    if (todo.some((item) => item.id === value?.replace(/\s/g, " "))) {
      toast.warn("Error");
    } else {
      toast.success("Success");
      const capitalizedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      setTodo((prev) => [
        ...prev,
        { id: capitalizedValue.replace(/\s/g, " "), job: capitalizedValue },
      ]);
    }
    setValue("");
  };
  const deleteTodo = (id) => {
    const updatedTodo = todo.filter((item) => item.id !== id);
    setTodo(updatedTodo);
  };
  return (
    <div className="flex flex-col  items-center h-screen">
      Todo list
      <div>
        <input
          type="text"
          className="outline-none border border-blue-600 px-2 py-4 w-[400px] rounded-[8px]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="button"
          className=" border-blue-600 bg-blue-500 mt-2 border-radius px-2 py-4 ml-3 h-14 rounded-[8px]"
          onClick={addTodo}
        >
          AddTodo
        </button>
      </div>
      <div className="flex flex-row border-2 border-solid ">
        <h3>List</h3>
      </div>
      <div className="flex flex-row border-0 border-solid">
        <ul>
          {todo?.map((item, index) => {
            return (
              <li key={index.id}>
                <span>{item.job}</span>
                <span className="ml-3">
                  <button
                    className=" mt-2 border-radius px-2  ml-3 h-14 rounded-[8px]"
                    onClick={() => deleteTodo(item.id)}
                  >
                    <AiFillDelete />
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
