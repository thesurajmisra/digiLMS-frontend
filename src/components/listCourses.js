import React, { useContext, useEffect, useState } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { CourseContext } from '../providers/courseContext';
import app_config from '../config';
import { Button, CardActions } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    root: {
        margin: 'auto',
    },
    content: {
        padding: 24,
    },
}));

const ListCourses = props => {

    const cardStyles = useStyles();
    const wideCardMediaStyles = useFourThreeCardMediaStyles();
    const fadeShadowStyles = useFadedShadowStyles();
    const textCardContentStyles = useN01TextInfoContentStyles();

    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = app_config.api_url + '/';

    const history = useHistory();

    const courseService = useContext(CourseContext);

    const fetchCourses = () => {
        courseService.getAll()
            .then(data => {
                console.log(data);
                setCourseList(data);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchCourses();

    }, [])

    const buyCourse = (course) => {
        // sessionStorage.setItem('course', JSON.stringify(course));
        console.log(course);
        history.push('/user/coursedetail/' + course._id);
    }

    return (
        <div className="col-md-10 mx-auto">

            <Card className="hero">
                <CardContent className="card-body" style={{ padding: '5rem 5rem' }}>
                    <h1 className="text-center">Explore Courses</h1>

                    <div className="input-group mt-5">
                        <input className="form-control" />
                        <button className="btn btn-primary">Search</button>
                    </div>

                </CardContent>
            </Card>

            <div className="row mt-5">
                {
                    courseList.map(course => {
                        return (
                            <div className="col-md-4 mt-5" key={course._id}>
                                <Card className={cx(cardStyles.root, fadeShadowStyles.root)}>
                                    <CardMedia
                                        classes={wideCardMediaStyles}
                                        image={
                                            url + course.avatar
                                        }
                                    />
                                    <CardContent className={cardStyles.content}>
                                        <TextInfoContent
                                            classes={textCardContentStyles}
                                            heading={course.title}
                                            body={
                                                course.description
                                            }
                                        />
                                    </CardContent>
                                    <CardActions>
                                        <Button color="inherit" onClick={e => buyCourse(course)}>Buy Now</Button>
                                    </CardActions>
                                </Card>

                            </div>

                        )
                    })
                }
            </div>

        </div>
    )
}

export default ListCourses;