import React, { useEffect, useState } from "react";
import styles from "../Styles/PollPage.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const PollPage = () => {
    const { id } = useParams();
    const [pollData, setPollData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    const fetchPollData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:5000/api/polls/${id}`,
            );

            console.log("Hello", response.data);
            setPollData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPollData();
    }, []);

    if (loading) {
        return (
            <div className={styles.center}>
                <div className={styles.loader}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.center}>
                <h2>{error}</h2>
            </div>
        );
    }

    useEffect(() => {
        const storedVal = localStorage.getItem(`livepoll_voted_${id}`);
        if (storedVal !== null) {
            setHasVoted(true);
        }
    }, [id]);
    useEffect(() => {
       
    }, [id]);



    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <span className={styles.badge}>Live Poll</span>

                <h1 className={styles.question}>{pollData?.question}</h1>

                <div className={styles.options}>
                    {pollData?.options?.map((option) => (
                        <button key={option._id} className={styles.option}>
                            <span>{option.text}</span>
                            <span>{option.voters} Votes</span>
                        </button>
                    ))}
                </div>

                <div className={styles.footer}>
                    Total Votes :{" "}
                    {pollData?.options?.reduce(
                        (sum, option) => sum + option.voters,
                        0,
                    )}
                </div>
            </div>
        </div>
    );
};

export default PollPage;
