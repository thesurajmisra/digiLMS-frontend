import { Button, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cssClasses from "../cssClasses";
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/userContext";

const ManageUser = props => {

    const userService = useContext(UserContext);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseClasses = cssClasses();

    const fetchUsers = () => {
        userService.getAllUsers()
            .then(data => {
                console.log(data);
                setUserList(data);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const deleteUser = (id) => {
        userService.deleteUser(id)
            .then(res => {
                console.log(res);
                fetchUsers();
            })
    }

    const displayUsers = () => {
        return userList.map((user, index) => {
            if (!loading) {
                return (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p><b>{user.fullname}</b></p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{ display: 'block' }}>
                                <div className="row mt-4">
                                    <div className="col-4">
                                        <p>Fullname</p>
                                    </div>
                                    <div className="col-8">

                                    </div>
                                </div>
                                <br />

                                <div className="row mt-4">
                                    <div className="col-4">
                                        <p>Email : </p>
                                    </div>
                                    <div className="col-8">
                                        <p><b>{user.email}</b></p>
                                    </div>
                                </div>
                                <br />

                                <div className="row mt-4">
                                    <div className="col-4">
                                        <p>Age : </p>
                                    </div>
                                    <div className="col-8">
                                        <p><b>{user.age}</b></p>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-4">
                                        <p>Scope : </p>
                                    </div>
                                    <div className="col-8">
                                        <p><b>{user.isadmin ? 'Admin' : 'User'}</b></p>
                                    </div>
                                </div>

                                <Button type="submit" className="mt-5 w-50" variant="contained" color="secondary">Update</Button>
                                <Button type="submit" className="mt-5 w-50 bg-danger color-white" variant="contained"
                                    onClick={(e) => deleteUser(user._id)}
                                >
                                    Delete
                                </Button>
                            </div>


                        </AccordionDetails>
                    </Accordion>
                );
            } else {
                return;
            }
        });
    };

    return <div style={{ marginTop: "5rem" }}>{displayUsers()}</div>;
}

export default ManageUser;