import { Link } from "react-router";

export function Header() {
    return (
        <header className="header container">
            <div>
                <Link to="/" style={{ fontWeight: 700 }}>Стрельбицкий Илья P3413</Link>
            </div>
            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users">Users</Link>
            </nav>
        </header>
    );
}
