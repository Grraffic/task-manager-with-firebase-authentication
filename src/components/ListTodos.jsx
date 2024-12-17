/* eslint-disable react/jsx-key */
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import SignOut from "./SignOut.jsx";

const ListTodos = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const collectionRef = collection(db, "todos");
      const querySnapshot = await getDocs(collectionRef);
      const todos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLoading(false);
      setTodos(todos);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleToggleTodo = async (id, completed) => {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, {
      completed: !completed,
    });

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const handleDeleteTodo = async (id) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = async () => {
    const collectionRef = collection(db, "todos");
    const docRef = await addDoc(collectionRef, {
      title: newTodo,
      completed: false,
    });

    setTodos([...todos, { id: docRef.id, title: newTodo, completed: false }]);
    setNewTodo("");
  };

  if (loading) return <>Loading...</>;

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-700">
          Welcome, {user.displayName || user.email}
        </h3>
        <SignOut />
      </div>

      {/* Add Todo */}
      <div className="flex items-center space-x-2 mb-6">
        <input
          type="text"
          value={newTodo}
          placeholder="Add Todo"
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FaPlus />
          <span>Add</span>
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded hover:shadow"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
                className="h-5 w-5 text-blue-500 focus:ring-blue-400"
              />
              <span
                className={`${
                  todo.completed ? "line-through text-gray-400" : "text-gray-700"
                } text-lg`}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-red-500 hover:text-red-600"
            >
              <MdDelete size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default ListTodos;
