import { Button, Card, CardContent, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Formik } from "formik";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../providers/userContext";
import cssClasses from "../cssClasses";

const styles = makeStyles(theme => ({
    card: {
        marginTop: '20%'
    },
}))

const Login = () => {

    const userService = useContext(UserContext);

    const baseClasses = cssClasses();
    const classes = styles();
    const history = useHistory();

    const loginForm = {
        email: '',
        password: ''
    };

    const onFormSubmit = (formdata, { setSubmitting }) => {
        console.log(formdata);
        setSubmitting = true;

        userService.getUserByEmail(formdata.email)
            .then(userdata => {
                if (userdata) {
                    if (userdata['password'] == formdata['password']) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Great!',
                            text: 'Successfully Loggedin',
                        }).then(() => {
                            userService.setLoggedin(true);
                            sessionStorage.setItem('user', JSON.stringify(userdata));
                            userService.setCurrentUser(userdata);
                            console.log(userService.currentUser);
                            if (userdata.isadmin) {
                                history.push("/admin");
                            } else {
                                history.push("/user");
                            }

                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops!',
                            text: "Email and Password does't match",
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops!',
                        text: "Email and Password does't match",
                    });
                }
                setSubmitting = false;
            })

    }

    return (
        <div className="col-md-3 mx-auto">

            <Card className={clsx(baseClasses.card, classes.card)}>
                <CardContent className={baseClasses.cardContent}>
                    <Formik
                        initialValues={loginForm}
                        onSubmit={onFormSubmit}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>

                                <h3 className="text-center"><span className="underline__post"><span>Login</span> Here</span></h3>

                                <label className="mt-4">Email</label>
                                <input type="text" className="form-control" id="email" onChange={handleChange} value={values.email} />

                                <label className="mt-4">Password</label>
                                <input type="password" className="form-control" id="password" onChange={handleChange} value={values.password} />



                                <div className="text-center">
                                    <Button type="submit" className="mt-5 w-100" variant="contained" color="secondary" >
                                        Submit
                                    </Button>
                                </div>

                                <p className="mt-3 text-center">Register Instead? <Link to="/main/register">Register Here</Link></p>

                            </form>
                        )}
                    </Formik>

                </CardContent>

            </Card>
        </div>
    )

}

export default Login;