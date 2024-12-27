import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import conf from "../conf/conf"



export const Login = () => {
    console.log(conf.backendUrl)
    const navgate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const createUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${conf.backendUrl}/api/user/login`, {
                email: email,
                password: password
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data.success)
            setEmail("")
            setPassword("")
            toast.success("User Login Successfully")
            navgate("/")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="w-full min-h-screen bg-white">
            <div className="w-[50%] max-w-[350px] min-w-[300px] p-5 shadow-lg border rounded-lg bg-white m-auto mt-10">
                <h1 className="font-bold text-xl text-center py-2">Login</h1>
                <form onSubmit={(e) => createUser(e)}>
                    <div className="flex flex-col gap-4">

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlFor="username">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full border p-2 rounded" type="text" placeholder="Enter your Email" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlFor="username">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full border p-2 rounded" type="text" placeholder="Enter your Password" />
                        </div>
                        <button className="w-full py-2 bg-blue-600 rounded text-white font-bold text-sm" type="submit">Login</button>
                    </div>
                </form>
                <p className="mt-3 text-center">
                    New user?
                    <Link className="text-blue-600" to={"/signup"}> Signup</Link>
                </p>
            </div>
        </div>
    )
}
