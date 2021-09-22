import React, { Fragment, useState, useRef } from "react";


const DoneHabit = ({ habit }) => {
    let yesRef = useRef();
    const [habit_id, setHabit_id] = useState(habit.habit_id);

    // Function to increase a streak
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
                class="btn btn-success"
                style={{ margin: "10px" }}
                data-toggle="modal"
                data-target={`#id${habit.habit_id}`}>
                Done?
            </button>

            <div class="modal" id={`id${habit_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div >
                                <h4 className="m-5" class="modal-title">Have you completed this habit today?🔥</h4>
                                {/* <button type="button" class="close" data-dismiss="modal">&times;</button> */}
                            </div>
                        </div>

                        <div class="modal-body">
                            <form className="d-flex">
                                <div >
                                    <button type="button"
                                        className="btn btn-success"
                                        class="btn btn-outline-primary mr-1"
                                        ref={yesRef}
                                        onClick={() => { increaseStreak(habit.habit_id, habit.habit_streak) }}>
                                        Yes
                                    </button>
                                </div>
                                <div>
                                    <button type="button"
                                        className="btn btn-warning"
                                        class="btn btn-outline-primary ms-1"
                                        onClick={() => { decreaseStreak(habit.habit_id, habit.habit_streak) }}>
                                        No
                                    </button>
                                </div>

                            </form>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div >
        </Fragment >
    )
}

export default DoneHabit;