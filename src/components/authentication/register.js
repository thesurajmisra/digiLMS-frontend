import { Card, CardContent, makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";
import { Formik } from "formik";
import { useContext } from "react";
import { UserContext } from "../../providers/userContext";
import cssClasses from "../cssClasses";
import back_img from '../../images/register_card.jpg';
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";

const styles = makeStyles(theme => ({
    card: {
        marginTop: '10%'
    },
    cardBack: {
        background: `url(${back_img}) no-repeat center`
    }
}))

const Register = () => {

    const userService = useContext(UserContext);
    const baseClasses = cssClasses();
    const classes = styles();
    const history = useHistory();

    const registerForm = {
        fullname: "",
        email: "",
        password: "",
        age: 0,
        interests: [],
        created: new Date(),
        isadmin: false,
        enrolled: [],
        avatar: ""
    };

    const onFormSubmit = (value, { setSubmitting }) => {
        console.log(value);
        setSubmitting = true;

        userService.addUser(value)
            .then(res => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'You have Successfully Logged in'
                })
                history.push("/main/login");
            });

    }

    return (
        <div className="col-md-8 mx-auto">

            <Card className={clsx(baseClasses.card, classes.card)}>
                <div className="row">
                    <div className="col-md-6">
                        <CardContent className={baseClasses.cardContent}>
                            <Formik
                                initialValues={registerForm}
                                onSubmit={onFormSubmit}
                            >
                                {({
                                    values,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting
                                }) => (
                                    <form onSubmit={handleSubmit}>

                                        <h3 className="text-center"><span className="underline__post"><span>Register</span> Here</span></h3>

                                        <TextField label="Full Name" variant="filled" name="fullname" className={baseClasses.input} onChange={handleChange} value={values.fullname} />
                                        <TextField label="Email" variant="filled" name="email" className={baseClasses.input} onChange={handleChange} value={values.email} />
                                        <TextField label="Password" variant="filled" type="password" name="password" className={baseClasses.input} onChange={handleChange} value={values.password} />



                                        <div className="text-center">
                                            <button className="btn btn-warning mt-5 w-100" >Submit</button>
                                        </div>

                                        <p className="mt-3 text-center">Already Registered? <Link to="/main/login">Login Here</Link></p>

                                    </form>
                                )}
                            </Formik>

                        </CardContent>
                    </div>
                    <div className={`col-md-6 ${classes.cardBack}`}>

                    </div>
                </div>
            </Card>
        </div>
    )

}

export default Register;