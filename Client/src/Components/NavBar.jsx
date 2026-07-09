import { NavLink } from "react-router-dom";
import styles from "../Styles/NavBar.module.css";

const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                Live<span>Poll</span>
            </div>

            <div className={styles.navLinks}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/create"
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                >
                    Create Poll
                </NavLink>

            
            </div>
        </nav>
    );
};

export default NavBar;
