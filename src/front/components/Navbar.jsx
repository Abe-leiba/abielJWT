import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const {store, dispatch} = useGlobalReducer()
	const logOut=() => {
		sessionStorage.removeItem("token")
		dispatch({type: "logout"})
		return
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
				{store.token?
					<button className="bg-danger" onClick={logOut}>Log out</button>:
					<div>
					<Link to="/signUp">
						<button className="bg-success">Sign Up</button>
					</Link>
					<Link to="/login">
						<button className="bg-primary">Log in</button>
					</Link>
					</div>
			}
				</div>
			</div>
		</nav>
	);
};