import { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import { BASE_URL } from '../config/api';
import Loader from '../components/Loader';



function ProjectListPage() {

    const [projects, setProjects] = useState(null)

    useEffect(() => {
        axios.get(BASE_URL + "/projects")
            .then(response => {
                const projectsArr = response.data.toReversed()
                setProjects(projectsArr)
            })
            .catch(e => console.log("Error getting projects from the API...", e));
    }, [])


    if (projects === null) {
        return <Loader />
    }

    return (
        <div>
            <h1>Project List Page</h1>
            <h2>Number of projects: {projects.length}</h2>

            {projects.map((projectObj) => {
                return (
                    <div className="card" key={projectObj.id}>
                        <h3>{projectObj.title}</h3>
                        <p>{projectObj.description}</p>

                        <Link to={`/projects/${projectObj.id}`}>
                            <button>More details</button>
                        </Link>
                    </div>
                )
            })}
        </div>
    );
}

export default ProjectListPage;