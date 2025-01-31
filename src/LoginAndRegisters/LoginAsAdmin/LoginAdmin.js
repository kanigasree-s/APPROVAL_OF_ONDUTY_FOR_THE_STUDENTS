import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
    Typography
} from "@material-tailwind/react";
import Navbar from "../../Home/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const defaultValues = {
    FacultyID: '',
    Password: '',
};

export const LoginAdmin = () => {
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues,
        mode: 'onTouched'
    });
    const navigate = useNavigate();
    const onSubmit = (data) => {
            const { FacultyID, Password } = data;
    
            // Fetch the student data by RollNo from the backend to check credentials
            fetch(`http://localhost:8080/admin/get/${FacultyID}`, {
                method: "GET",
            })
            .then((response) => response.json())
            .then((admin) => {
                console.log(admin);  // Log the response to inspect the student object
                localStorage.setItem('FacultyID',admin.faculty_id);
                localStorage.setItem('name',admin.name);
                if (admin && admin.password === Password) {
                    // Login successful
                    toast.success("Login successful!");
                    reset(defaultValues);
                    setTimeout(() => {
                        navigate("/Profile");
                    }, 3000);
                } else {
                    // Invalid credentials or missing student data
                    toast.error("Invalid ID or Password. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
                toast.error("An error occurred. Please try again.");
            });
        };

    return (
        <section>
            <Navbar/>

            <div className="home md:px-[100px]">
                <div className="flex items-center justify-center h-[80vh] w-[100%]">
                    <Card className={'w-[400px]'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Typography variant="h4" color="black" className={'flex item center justify-center pt-3'}>
                                Admin Login
                            </Typography>

                            <CardBody className="flex flex-col gap-4">
                                <div>
                                    <Controller
                                        name="FacultyID"
                                        control={control}
                                        rules={{
                                            required: "Faculty ID is required",
                                            minLength: {
                                                value: 7,
                                                message: "Faculty ID should be 7 characters long"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Faculty ID"
                                                type="text"
                                                color="blue"
                                                size="lg"
                                                error={!!errors.FacultyID}
                                            />
                                        )}
                                    />
                                    {errors?.FacultyID?.message && <span className={'text-red-500 text-xs'}>{errors.FacultyID.message}</span>}
                                </div>

                                <div>
                                    <Controller
                                        name="Password"
                                        control={control}
                                        rules={{
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password should be at least 8 characters long"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Password"
                                                type="password"
                                                color="blue"
                                                size="lg"
                                                error={!!errors.Password}
                                            />
                                        )}
                                    />
                                    {errors?.Password?.message && <span className={'text-red-500 text-xs'}>{errors.Password.message}</span>}
                                </div>
                            </CardBody>

                            <CardFooter className="pt-0">
                                <Button type="submit" variant="text" className={'bg-light-blue-800 text-white hover:bg-light-blue-700'} fullWidth>
                                    Login
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
                <ToastContainer />
            </div>
        </section>
    );
};

export default LoginAdmin;
