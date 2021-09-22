import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { CardContent, CardMedia, Typography, CardActionArea, ButtonBase } from "@material-ui/core"
import EditHabit from "./EditHabit";
import { Modal } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Overlay from "@restart/ui/esm/Overlay";
import Card from "react-bootstrap/Card";
import DoneHabit from "./DoneHabit";

const CardListHabit = () => {
    const [show, setShow] = useState(false);


    const [habits, setHabits] = useState([]);
    async function getHabits() {
        try {
            const response = await fetch("http://localhost:5000/habits");

            const habitArray = await response.json();

            setHabits(habitArray);
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        getHabits();
    }, []);

    const CardListItem = props => {
        return (
            <Fragment>
                <Card style={{
                    width: '18rem',
                    margin: "20px"
                }} className="d-inline-flex p-2 col-example">
                    <Card.Body>
                        <Card.Title>{"🎯" + props.habit.habit_name}</Card.Title>
                        <Card.Text>
                            {"🔥" + props.habit.habit_streak}
                            {"🎁" + props.habit.habit_reward}
                        </Card.Text>
                        <EditHabit habit={props.habit} />

                        <DoneHabit  habit={props.habit} />


                    </Card.Body>
                </Card>
            </Fragment>
        );
    };
    return (
        <ul style={{ listStyleType: "none" }}>
            {habits.map(habit => {
                return <CardListItem habit={habit} key={habit.habit_id} />;
            })}
        </ul>
    )
}

export default CardListHabit;