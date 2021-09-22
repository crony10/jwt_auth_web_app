import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Components
import InputHabit from "./habits/InputHabit"


const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getName()
    }, []);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successully!")
    }
    return (
        <Fragment>
            <div className="d-flex mt-5 justify-content-around">
                <h1>Welcome, {name}</h1>
                <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
            </div>
            <InputHabit />
        </Fragment>
    )
}

export default Dashboard;