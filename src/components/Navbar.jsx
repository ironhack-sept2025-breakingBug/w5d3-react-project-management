import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <nav className="Navbar">
            <NavLink to="/">
                <button>Home</button>
            </NavLink>

            <NavLink to="/projects">
                <button>Projects</button>
            </NavLink>

            <NavLink to="/projects/create">
                <button>Create project</button>
            </NavLink>
        </nav>
    )
}

export default Navbar