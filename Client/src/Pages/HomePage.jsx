import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../Styles/HomePage.module.css";

const HomePage = () => {
    const [polls, setPolls] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePolls = async () => {
        setLoading(true);

        try {
            const response = await axios.get("http://localhost:5000/api/polls");
            setPolls(response.data);
        } catch (error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handlePolls();
    }, []);

    if (loading) return <h2 className={styles.message}>Loading...</h2>;

    if (error) return <h2 className={styles.error}>Something went wrong!</h2>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Live Polls</h1>

                <p>Vote on Live Polls and wach result update instantly</p>

            </div>

            {polls.length === 0 ? (
                <p className={styles.message}>No Polls Found</p>
            ) : (
                <div className={styles.grid}>
                    {polls.map((poll) => (
                        <Link
                            to={`/poll/${poll._id}`}
                            key={poll._id}
                            className={styles.card}
                        >
                            <h2>{poll.question}</h2>

                            <p>Options: {poll.options.length}</p>

                            <p>Total Votes: {poll.totalVotes}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
