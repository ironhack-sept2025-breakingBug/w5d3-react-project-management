import { use, useEffect, useState } from 'react';
import axios from 'axios'

import Loader from '../components/Loader';

const BASE_URL = 'https://project-management-api-2e731c3b8929.herokuapp.com'


function ProjectListPage() {

    const [projects, setProjects] = useState(null)

    useEffect(() => {
        axios.get(BASE_URL + "/projects")
            .then(response => {
                setProjects(response.data)
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
                    </div>
                )
            })}
        </div>
    );
}

export default ProjectListPage;