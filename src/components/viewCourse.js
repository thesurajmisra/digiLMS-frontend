import { Chip, Card, CardContent, Backdrop, CircularProgress, makeStyles, Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from '@material-ui/core';
import { createRef, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CourseContext } from '../providers/courseContext';

import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    image: {
        margin: 'auto'
    }
}));

const ViewCourse = () => {

    const classes = useStyles();
    const [courseDetail, setCourseDetail] = useState(null);
    const { id } = useParams();
    const courseService = useContext(CourseContext);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const wrapper = createRef();
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const history = useHistory();

    useEffect(() => {
        console.log(id);
        courseService.getById(id)
            .then(data => {
                console.log(data);
                setCourseDetail(data);
                setLoading(false);
            })
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handlePurchase = () => {
        console.log(courseDetail);
        sessionStorage.setItem('course', JSON.stringify(courseDetail));
        history.push('/user/checkout');
    }

    if (courseDetail) {
        return (
            <div className="col-md-10 mx-auto">
                <h1>Course Details</h1>

                <div className="row">
                    <div className="col-md-8">
                        <Card>
                            <CardContent>

                                <div className="row">
                                    <div className="col-md-4">
                                        <h4>Course Name : </h4>
                                        <p>{courseDetail.title}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Description : </h4>
                                        <p>{courseDetail.description}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Duration : </h4>
                                        <p>{courseDetail.description}</p>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>

                    </div>
                    <div className="col-md-4">
                        <Card>
                            <CardContent>
                                <h2>Rs. 4500/-</h2>
                                <Button variant="contained" color="secondary" onClick={handlePurchase}>Purchase</Button>

                            </CardContent>
                        </Card>

                    </div>
                </div>


                <Card className="mt-5">
                    <CardContent>
                        {courseDetail.data.sections.map((section, sect_i) =>
                        (
                            <div style={{ padding: '2rem', border: '1px solid gray', background: 'grey', marginTop: '1rem' }} key={sect_i}>
                                <h3>Section {`${sect_i + 1}: `}{section.name}</h3>
                                {section.description}
                                {
                                    section.lectures.map((lecture, lect_i) =>
                                    (
                                        <Accordion key={lect_i} ref={wrapper}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <h4>Lecture {`${lect_i + 1}: `}{lecture.name}</h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {lecture.description}

                                            </AccordionDetails>

                                            <AccordionActions>

                                            </AccordionActions>
                                        </Accordion>

                                    )
                                    )
                                }
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Backdrop ref={wrapper} className={classes.backdrop} open={loading} onClick={() => { setLoading(false) }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        )
    } else {
        return (
            <div>Nothing Here</div>
        )
    }
}

export default ViewCourse;