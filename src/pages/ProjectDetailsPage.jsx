import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Checkbox, MultiSelect, SimpleGrid } from "@mantine/core";

import { BASE_URL } from "../config/api";
import Loader from "../components/Loader";
import AddTask from "../components/AddTask";


function ProjectDetailsPage() {

    const [project, setProject] = useState(null)

    const { projectId } = useParams()

    const navigate = useNavigate()


    useEffect(() => {
        getProject()
    }, [projectId]);


    const getProject = () => {
        axios.get(`${BASE_URL}/projects/${projectId}?_embed=tasks`)
            .then(response => {
                setProject(response.data)
            })
            .catch((error) => console.log("Error getting project details from the API...", error));
    }


    const deleteProject = () => {
        axios.delete(`${BASE_URL}/projects/${projectId}`)
            .then(response => {
                navigate("/projects")
            })
            .catch(e => console.log("Error deleting project...", e));
    }


    if (project === null) {
        return <Loader />
    }


    return (
        <div className="ProjectDetailsPage">
            <h1>{project.title}</h1>
            <p>{project.description}</p>

            <AddTask projectId={projectId} onRefresh={getProject} />

            {/* List of tasks */}
            <SimpleGrid cols={{base: 1, md: 3}}>
                {project.tasks.map((task) => {
                    return (
                        <div className="TaskCard card" key={task.id}>
                            <h3>{task.title}</h3>
                            <h4>Description:</h4>
                            <p>{task.description}</p>
                        </div>)
                })}
            </SimpleGrid>


            <Link to={`/projects/edit/${project.id}`}>
                <Button variant="outline" color="indigo">Edit</Button>
            </Link>


            <Button onClick={deleteProject} variant="outline" color="red">Delete</Button>

            <Link to="/projects">
                <Button color="indigo">Back to projects</Button>
            </Link>
        </div>
    );
}

export default ProjectDetailsPage