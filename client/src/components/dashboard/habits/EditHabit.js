import React, { Fragment, useState, useRef } from "react";

const EditHabit = ({ habit }) => {
    let yesRef = useRef();

    const [habit_id, setHabit_id] = useState(habit.habit_id);
    const [habit_name, setHabit_name] = useState(habit.habit_name);
    const [habit_duration, setHabit_duration] = useState(habit.habit_duration);
    const [habit_reward, setHabit_reward] = useState(habit.habit_reward);


    const editText = async (id) => {

        try {
            const body = { habit_name, habit_duration, habit_reward };

            const res = await fetch(`http://localhost:5000/habits/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            // console.log(res);
            window.location = "/";
        } catch (err) {
            console.errror(err.message)
        }
    }

    async function deleteHabit(id) {
        try {
            const response = await fetch(`http://localhost:5000/habits/${id}`, {
                method: "DELETE"
            })
            // console.log(response);
            // setHabits(habits.filter(habit => habit.habit_id !== id))
            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    }

    const increaseStreak = async (id, habit_streak) => {
        try {

            yesRef.current.setAttribute("disabled", "disabled");
            if (habit.habit_streak !== habit.habit_duration) {
                habit_streak += 1;
            }
            else {
                alert("Congratulation now you can claim your reward of: " + habit.habit_reward);
                return;
            }

            const body = { habit_streak };

            const res = await fetch(`http://localhost:5000/habits/increaseStreak/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            // console.log(res);
            window.location = "/";
        } catch (err) {
            console.errror(err.message)
        }
    }

    // Function to decrease a streak
    const decreaseStreak = async (id, habit_streak) => {
        try {
            if (habit_streak !== 0)
                habit_streak -= 1;
            else {
                alert("you at least have to complete one day")
                return;
            }

            const body = { habit_streak };

            const res = await fetch(`http://localhost:5000/habits/increaseStreak/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            // console.log(res);
            window.location = "/";
        } catch (err) {
            console.errror(err.message)
        }
    }

    return (
        <Fragment>
            <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target={`#idd${habit.habit_id}`}>
                Edit
            </button>

            <div class="modal" id={`idd${habit_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <div >
                                <h4 className="m-5" class="modal-title">{habit_name}</h4>
                            </div>

                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label>🎯Name</label>
                                    <input type="text" class="form-control" value={habit_name} onChange={e => setHabit_name(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="Duration">🔥Duration(In days)</label>
                                    <input type="number" class="form-control"
                                        id="Duration"
                                        onChange={e => setHabit_duration(e.target.value)}
                                        value={habit_duration}
                                    />
                                </div>
                                <div >
                                    <label htmlFor="Reward">🎁Reward</label>
                                    <input type="text" class="form-control"
                                        id="Reward"
                                        size="25"
                                        onChange={e => setHabit_reward(e.target.value)}
                                        value={habit_reward} />
                                </div>
                            </form>

                            <div>
                                <label htmlFor="Reward">❌Delete the habit?</label>
                                <button
                                    style={{ margin: "10px" }}
                                    onClick={() => deleteHabit(habit_id)}
                                    className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button"
                                class="btn btn-warning"
                                data-dismiss="modal"
                                onClick={() => editText(habit_id)}>Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* {alert("alaa oooooo")} */}
        </Fragment>
    )
}

export default EditHabit;