import { useState } from "react";
import styles from "../Styles/CreatePage.module.css";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreatePoll = () => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const addOption = () => {
        if (options.length < 4) {
            setOptions([...options, ""]);
        }
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            const updatedOptions = options.filter((_, i) => i !== index);
            setOptions(updatedOptions);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/polls",
                {
                    question,
                    options,
                },
            );

            console.log(response);
            
            setQuestion("");
            setOptions(["", ""]);
            setError(false);
            navigate(`/poll/${response.data.poll._id}`)
        } catch (error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h1>Create Poll</h1>

                <input
                    type="text"
                    placeholder="Enter Poll Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />

                {options.map((option, index) => (
                    <div key={index} className={styles.optionRow}>
                      <p> {index +1 } </p>
                        <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            required
                            onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                            }
                        />

                        {options.length > 2 && (
                            <button
                                type="button"
                                onClick={() => removeOption(index)}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}

                {options.length < 4 && (
                    <button
                        type="button"
                        className={styles.addBtn}
                        onClick={addOption}
                    >
                        + Add Option({options.length}/{4})
                    </button>
                )}
                {error && (
                    <span className={styles.errorMessage}>
                        ⚠️Something went Wrong. Please try again later
                    </span>
                )}

                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                >
                    {loading ? (
                        <ClipLoader color="#fff" size={20} />
                    ) : (
                        "Create Poll"
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreatePoll;
