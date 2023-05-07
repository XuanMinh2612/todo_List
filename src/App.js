import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
function App() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("todo"));
    if (storedTodo) {
      setTodo(storedTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const addTodo = () => {
    const capitalizedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    const cleanedId = capitalizedValue
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const isDuplicate = todo.some((item) => item.id === cleanedId);
    setTodo((prev) => {
      if (!isDuplicate) {
        toast.success("Success");
        return [
          ...prev,
          { id: capitalizedValue.replace(/\s/g, " "), job: capitalizedValue },
        ];
      } else {
        toast.warn("Error");
        return prev;
      }
    });
    setValue("");
  };

  const deleteTodo = (id) => {
    const updatedTodo = todo.filter((item) => item.id !== id);
    setTodo(updatedTodo);
  };
  return (
    <div className="bg-gradient-to-br from-pink-300 to-blue-500 flex justify-center items-center h-screen">
      <div className="flex flex-col items-center h-4/5 w-[600px] mt-3 border-solid border-2 rounded-lg border-sky-200 bg-[#fff]">
        <span className="text-blue-500 font-extrabold text-3xl mt-10">
          Todo list
        </span>

        <div className="flex flex-row mt-5">
          <input
            type="text"
            className="outline-none border border-blue-600 px-2 py-4 w-[400px] rounded-[8px]"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="button"
            className=" border-blue-600 bg-blue-500 border-radius px-2  ml-3 h-14 rounded-[8px]"
            onClick={addTodo}
          >
            <IoIosAdd className=" text-white text-3xl" />
          </button>
        </div>
        <div className="flex flex-row  ">
          <h3 className="text-blue-500 font-medium text-[28px] mt-2">List</h3>
        </div>
        <div className="flex flex-row border-0 border-solid">
          <ul className="w-[320px]">
            {todo?.map((item, index) => {
              return (
                <li
                  className="flex flex-row w-3/4 place-content-between"
                  key={index.id}
                >
                  <span className="ml-5 p-1 max-w-[200px] break-words font-semibold">
                    {item.job}
                  </span>
                  <span className="ml-3">
                    <button
                      className=" text-2xl p-1 -mr-10 text-red-600"
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
    </div>
  );
}

export default App;
