import { useState } from "react"
import axios from "axios"

import { BASE_URL } from "../config/api"
import { useNavigate } from "react-router-dom"


function CreateProjectPage() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()

        const newProject = {
            title: title,
            description: description
        }

        axios.post(`${BASE_URL}/projects`, newProject)
            .then(() => {
                navigate("/projects")
            })
            .catch(e => console.log("Error creating a new project...", e))
    }


    return (
        <div className="CreateProjectPage">
            <h3>Add Project</h3>

            <form onSubmit={handleSubmit}>

                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        placeholder="enter the title"
                        required
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </label>

                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        placeholder="enter the description"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </label>

                <button>Create</button>
            </form>
        </div>
    )
}

export default CreateProjectPage