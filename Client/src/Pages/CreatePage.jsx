import { useState } from "react";
import styles from "../Styles/CreatePage.module.css";

const CreatePoll = () => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);

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

        try {
            const response = await fetch(
                "http://localhost:5000/api/polls",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        question,
                        options,
                    }),
                }
            );

            const data = await response.json();

            alert(data.message);

            setQuestion("");
            setOptions(["", ""]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <form
                className={styles.card}
                onSubmit={handleSubmit}
            >
                <h1>Create Poll</h1>

                <input
                    type="text"
                    placeholder="Enter Poll Question"
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    required
                />

                {options.map((option, index) => (
                    <div
                        key={index}
                        className={styles.optionRow}
                    >
                        <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) =>
                                handleOptionChange(
                                    index,
                                    e.target.value
                                )
                            }
                            required
                        />

                        {options.length > 2 && (
                            <button
                                type="button"
                                onClick={() =>
                                    removeOption(index)
                                }
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
                        + Add Option
                    </button>
                )}

                <button
                    type="submit"
                    className={styles.submitBtn}
                >
                    Create Poll
                </button>
            </form>
        </div>
    );
};

export default CreatePoll;