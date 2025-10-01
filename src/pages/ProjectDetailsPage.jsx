import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { BASE_URL } from "../config/api";
import Loader from "../components/Loader";


function ProjectDetailsPage() {

    const [project, setProject] = useState(null)

    const { projectId } = useParams()

    useEffect(() => {
        axios.get(`${BASE_URL}/projects/${projectId}`)
            .then(response => {
                setProject(response.data)
            })
            .catch((error) => console.log("Error getting project details from the API...", error));
    }, [projectId]);


    if (project === null) {
        return <Loader />
    }


    return (
        <div className="ProjectDetailsPage">
            <h1>{project.title}</h1>
            <p>{project.description}</p>

            <Link to={`/projects/edit/${project.id}`}>
                <button>Edit</button>
            </Link>

            <Link to="/projects">
                <button>Back to projects</button>
            </Link>
        </div>
    );
}

export default ProjectDetailsPage