import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button, Card, CardBody, CardFooter, Input, Option, Select, Typography } from "@material-tailwind/react";
import Navbar from "../../Home/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

const defaultValues = {
    Name: '',
    RollNumber: '',
    Year: '',
    Email: '',
    Password: '',
};

export const RegisterStudent = () => {
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues,
        mode:'onTouched'
    });
    const navigate = useNavigate();

    const onSubmit = (data) => {
    const student = {
        name: data.Name,
        rollno: data.RollNumber,
        year: data.Year,
        email: data.Email,
        password: data.Password,
    };

    // Send data to the backend
    fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
    })
        .then((response) => {
            if (response.ok) {
                toast.success("Registered successfully!");
                reset(defaultValues);
                setTimeout(() => {
                    navigate("/LoginStudent");
                }, 3000);
            } else {
                toast.error("Failed to register. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error during registration:", error);
            toast.error("An error occurred. Please try again.");
        });
};
    return (
        <section>
            <Navbar />

            <div className="home md:px-[100px]">
                <div className="flex items-center justify-center h-[80vh] w-[100%]">
                    <Card className={'w-[400px]'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Typography variant="h5" color="black" className={'flex item center justify-center pt-3'}>
                                Register Student
                            </Typography>

                            <CardBody className="flex flex-col gap-4">
                                <div>
                                    <Controller
                                        name="Name"
                                        control={control}
                                        rules={{
                                            required: "Name is required",
                                            minLength: {
                                                value: 3,
                                                message: "Name should be at least 3 characters long"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Name"
                                                type="text"
                                                color="blue"
                                                size="lg"
                                                error={!!errors.Name}
                                            />
                                        )}
                                    />
                                    {errors?.Name?.message && <span className={'text-red-500 text-xs'}>{errors.Name.message}</span>}
                                </div>

                                <div>
                                    <Controller
                                        name="RollNumber"
                                        control={control}
                                        rules={{
                                            required: "Roll Number is required",
                                            minLength: {
                                                value: 12,
                                                message: "Roll number should be 12 characters long"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Roll Number"
                                                type="text"
                                                color="blue"
                                                size="lg"
                                                error={!!errors.RollNumber}
                                            />
                                        )}
                                    />
                                    {errors?.RollNumber?.message && <span className={'text-red-500 text-xs'}>{errors.RollNumber.message}</span>}
                                </div>

                                <div>
                                    <Controller
                                        name="Year"
                                        control={control}
                                        rules={{ required: "Year is required" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Year"
                                                animate={{
                                                    mount: { y: 0 },
                                                    unmount: { y: 25 },
                                                }}
                                                color="blue"
                                                error={!!errors.Year} 
                                            >
                                                <Option value="">Select an option</Option>
                                                <Option value="I Year">I Year</Option>
                                                <Option value="II Year">II Year</Option>
                                                <Option value="III Year">III Year</Option>
                                                <Option value="IV Year">IV Year</Option>
                                            </Select>
                                        )}
                                    />
                                    {errors?.Year?.message && <span className={'text-red-500 text-xs'}>{errors.Year.message}</span>}
                                </div>

                                <div>
                                    <Controller
                                        name="Email"
                                        control={control}
                                        rules={{
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Invalid email address"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Email"
                                                type="email"
                                                color="blue"
                                                size="lg"
                                                error={!!errors.Email}
                                            />
                                        )}
                                    />
                                    {errors?.Email?.message && <span className={'text-red-500 text-xs'}>{errors.Email.message}</span>}
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
                                <Button type="submit" variant="text" className={'bg-light-blue-800 text-white hover:bg-light-blue-700'}  fullWidth>
                                    Register
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

export default RegisterStudent;
