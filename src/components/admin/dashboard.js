import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/userContext";
import cssClasses from '../cssClasses';
import { Bar } from 'react-chartjs-2';
import { CourseContext } from "../../providers/courseContext";




const customStyles = makeStyles(theme => ({
    card: {
        marginTop: '2rem'
    },
    infoTitle: {
        fontSize: '2em',
        fontWeight: 'bold'
    },
    info: {
        fontSize: '4em',
        fontWeight: 'bold'
    }
}))

const AdminDashboard = props => {

    const baseClasses = cssClasses();
    const customClasses = customStyles();

    const [usersList, setUsersList] = useState([]);
    const [courseList, setCourseList] = useState([]);

    const [regData, setRegData] = useState({});
    const [courseData, setCoursetData] = useState({});


    const useService = useContext(UserContext)
    const courseService = useContext(CourseContext);


    const fetchUsers = () => {
        return useService.getAllUsers()
            .then(data => {
                console.log(data);
                setUsersList(data);
                return data
            })
    }

    const fetchCourses = () => {
        return courseService.getAll()
            .then(data => {
                console.log(data);
                setCourseList(data);
                return data
            })
    }

    useEffect(() => {
        fetchUsers()
            .then(data => {
                console.log(data);
                prepareRegData(data, setRegData);
            })


        fetchCourses()
            .then(data => {
                console.log(data);
                prepareRegData(data, setCoursetData);
            })

    }, [])

    const prepareRegData = async (users, setter) => {
        getDatewiseValues(users, 'created').then(data => {
            console.log(data)
            let reg = {};
            reg['dates'] = data[0];
            reg['values'] = data[1];
            setter(reg);
        });
    }

    const getDatewiseValues = async (records, colname) => {
        console.log(records);
        let dates = [];
        let values = [];
        return getUniqueValues(colname, records).then((unique_values) => {
            for (let value of unique_values[1]) {
                console.log(value);
                dates.push(formatDate(new Date(value)));
                values.push(getCount(unique_values[0], value));

            }
            return [dates, values];
        });
    }

    const getUniqueValues = async (col_name, data) => {
        // console.log(col_name+' '+data);
        let values = data.map((ele) => {
            let date = new Date(ele[col_name]).setHours(0, 0, 0, 0);
            // console.log(new Date(date).getTime());
            return new Date(date).getTime();
        });

        let uniquevalues = [];
        for (let value of values) {
            if (!uniquevalues.includes(value)) {
                uniquevalues.push(value);
                // console.log(value);
            }
        }

        return [values, uniquevalues];
    }

    const getCount = (records, item) => {
        let count = 0;
        for (let record of records) {
            if (record == item) {
                count++;
            }
        }

        return count;
    }


    const drawBar = (labels, data, legend) => {

        let options = {
            maintainAspectRatio: false,
        }


        if (data) {
            return (
                <Bar data={{
                    labels: labels,
                    datasets: [{ label: legend, data: data }]
                }}
                    options={options} />
            )
        }
    }

    const formatDate = (date) => {
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();

        return mm + '/' + dd + '/' + yyyy;
    }


    return (
        <div className="col-md-11 mx-auto">

            <div className="row">
                <div className="col-md-6">
                    <Card className={clsx(baseClasses.card, customClasses.card)}>
                        <CardContent>
                            <div className="row">
                                <div className="col-8">
                                    <p className={customClasses.infoTitle}>Registrations : </p>
                                </div>
                                <div className="col-4 mx-auto">
                                    <p className={customClasses.info}>{usersList.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card className={clsx(baseClasses.card, customClasses.card)}>
                        <CardContent>
                            <div className="row">
                                <div className="col-8">
                                    <p className={customClasses.infoTitle}>Equipments : </p>
                                </div>
                                <div className="col-4 mx-auto">
                                    <p className={customClasses.info}>{courseList.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Card className={clsx(baseClasses.card, customClasses.card)}>
                        <CardContent>
                            {drawBar(regData.dates, regData.values, 'Registrations')}
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card className={clsx(baseClasses.card, customClasses.card)}>
                        <CardContent>
                            {drawBar(courseData.dates, courseData.values, 'Courses')}
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default AdminDashboard;