import { useEffect, useState } from "react"
import axios from "axios"
import { IoIosSend } from "react-icons/io";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import { Loading } from "./Loading";

axios.defaults.withCredentials = true
axios.defaults.baseURL = conf.backendUrl

export const Home = () => {
    const navigate = useNavigate()
    const [todos, setTodos] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [newTodo, setNewTodo] = useState("")


    const fetchTodos = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/todo/fetch", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setTodos(response.data.data || [])
            setError(null)
        } catch (error) {
            if (error.response?.data?.token !== true) {
                navigate("/login")
            }
            setError("Failed to fetch todos")
        } finally {
            setLoading(false)
        }
    }

    const createTodo = async () => {
        if (!newTodo) return;
        try {
            const response = await axios.post("/api/todo/create", {
                text: newTodo,
                completed: false
            }, {
                withCredentials: true
            })
            setTodos([...todos, response.data.data])
            setNewTodo("")

        } catch (error) {
            setError("Failed to Create todo" + error.message)
        }
    }

    const todoStatus = async (id) => {
        const todo = todos.find((t) => t._id === id)
        try {
            const response = await axios.put(`/api/todo/update/${id}`, {
                ...todo,
                completed: !todo.completed
            }, {
                withCredentials: true
            })
            setTodos(todos.map((t) => t._id === id ? response.data.data : t))
            console.log(response.data)

        } catch (error) {
            setError("Failed to Find todo status" + error.message)
        }

    }

    const todoDelete = async (id) => {
        try {
            await axios.delete(`/api/todo/delete/${id}`, {
                withCredentials: true
            })
            setTodos(todos.filter((t) => t._id !== id))
        } catch (error) {
            setError("Failed to Delete Todo" + error.message)
        }
    }

    const logoutUser = async () => {
        try {
            const { data } = await axios.get("/api/user/logout", {
                withCredentials: true
            })
            console.log(data)
            toast.success(data.success)
            navigate("/login")
        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data.success || error.response.data.message)
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const remeningtodo = todos.filter((todo) => todo.completed !== true)

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            <div className="w-full min-h-screen bg-white  px-4">
                {loading &&
                    <Loading />
                }
                <div className="sm:w-[50%] w-full p-5 shadow-lg border rounded-lg bg-white m-auto mt-10">
                    <h1 className="font-bold text-xl text-center py-2">Todo App</h1>
                    <div className="flex items-center  h-10">
                        <form className="flex items-center w-full h-10" onSubmit={(e) => { e.preventDefault(); createTodo() }}>
                            <input
                                onChange={(e) => setNewTodo(e.target.value)}
                                value={newTodo}
                                className="flex-grow border w-full p-2 h-full rounded-l-md focus:outline-none"
                                type="text"
                                name="text"
                                id=""
                                placeholder="Enter new todo"
                            />
                            <button
                                type="submit"
                                className="bg-green-300 h-full px-5 flex items-center justify-center rounded-r-md hover:bg-green-400 transition-all"
                            >
                                <IoIosSend />
                            </button>
                        </form>
                    </div>

                    <ul>
                        {
                            todos.map((item, index) => (
                                <li key={item._id || index} className="flex items-center justify-between my-2">
                                    <div className="flex items-center gap-4">
                                        <input onChange={() => todoStatus(item._id)} value={item.completed} type="checkbox" />
                                        <span className={`${item.completed === true ? "line-through" : ""}`}>{item.text}</span>
                                    </div>
                                    <button onClick={() => todoDelete(item._id)}>de</button>
                                </li>
                            ))
                        }
                    </ul>
                    <p className="text-center font-semibold">{remeningtodo.length} Todo Remaining</p>
                    <div className="text-center mt-4">
                        <button onClick={logoutUser} className="bg-red-500 py-1 px-5 rounded-md text-white font-semibold">Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}
