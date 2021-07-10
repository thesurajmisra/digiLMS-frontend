import { Button, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cssClasses from "../cssClasses";
import { Link, useHistory } from "react-router-dom";
import { CourseContext } from "../../providers/courseContext";
import app_config from "../../config";

const ManageUserCourses = props => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const courseService = useContext(CourseContext);
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseClasses = cssClasses();
    const history = useHistory();

    const fetchCourses = () => {
        console.log(currentUser);
        setCourseList(currentUser.enrolled);
        setLoading(false);
    }

    useEffect(() => {
        fetchCourses();
    }, [])

    const deleteCourse = (id) => {
        courseService.deleteCourse(id)
            .then(res => {
                console.log(res);
                fetchCourses();
            })
    }

    const viewCourse = (id) => {
        history.push('/user/study/' + id);
    }

    const displayCourses = () => {
        return courseList.map((course, index) => {
            if (!loading) {
                return (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{course.name}</Typography>
                            <div className="row w-100">
                                <div className="col-md-12">{course.title}</div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100" style={{ display: 'block' }}>
                                <img src={app_config.api_url + '/' + course.avatar} style={{ width: '10rem' }} />

                                <div className="row">
                                    <div className="col-4">
                                        <p>Description</p>
                                    </div>
                                    <div className="col-8">
                                        <p>{course.description}</p>
                                    </div>
                                </div>
                                <br />

                                <div className="row">
                                    <div className="col-4">
                                        <p>Category</p>
                                    </div>
                                    <div className="col-8">
                                        <p>{course.category}</p>
                                    </div>
                                </div>
                                <br />

                                <div className="row">
                                    <div className="col-4">
                                        <p>Price</p>
                                    </div>
                                    <div className="col-8">
                                        <p>{course.price}</p>
                                    </div>
                                </div>

                                <Button
                                    varaint="outline"
                                    color="secondary"
                                    onClick={(e) => viewCourse(course._id)}
                                >
                                    View
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

    return <div style={{ marginTop: "5rem" }}>{displayCourses()}</div>;
}

export default ManageUserCourses;