import { useState } from 'react';
import DrawerComponent from '../drawer';
import Header from '../header';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useRouteMatch, Switch, Route } from 'react-router';
import Profile from '../profile';
import ViewCourse from '../viewCourse';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Checkout from '../checkout';
import Study from './study';
import ManageUserCourses from './manageUserCourses';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 60,
        height: '100vh'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 230,
    },
}));

const UserDashboard = () => {

    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleDrawerOpen = () => {
        console.log('drawer opened');
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let { path, url } = useRouteMatch();

    const drawerOptions = [
        {
            name: "Profile",
            icon: <AccountBoxIcon />,
            link: `${url}/profile`
        },
        {
            name: "My Courses",
            icon: <PostAddIcon />,
            link: `${url}/managecourses`
        }
    ]

    return (
        <div>
            <Header open={open} setOpen={setOpen} drawerWidth={drawerWidth} handleDrawerOpen={handleDrawerOpen} drawer={true} />
            <DrawerComponent open={open} setOpen={setOpen} drawerWidth={drawerWidth} handleDrawerClose={handleDrawerClose} drawerOptions={drawerOptions} />

            <div className={clsx(classes.content, {
                [classes.contentShift]: open,
            }, 'user-layout')}>
                <Switch>
                    <Route path={`${path}/profile`} component={Profile} />
                    <Route path={`${path}/coursedetail/:id`} component={ViewCourse} />
                    <Route path={`${path}/study/:id`} component={Study} />
                    <Route path={`${path}/checkout`} component={Checkout} />
                    <Route path={`${path}/managecourses`} component={ManageUserCourses} />
                    <Route exact path={`${path}`}>
                        <Profile />
                    </Route>
                </Switch>
            </div>


        </div>
    )
}


export default UserDashboard;