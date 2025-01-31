import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
    Option,
    Select,
    Typography
} from "@material-tailwind/react";
import Navbar from "../../Home/Navbar";
import { useNavigate } from "react-router-dom";

const defaultValues = {
    Name: '',
    FacultyID: '',
    Role: '',
    Email: '',
    Password: '',
};

export const RegisterAdmin = () => {
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues,
        mode: 'onTouched'
    });

    const navigate = useNavigate();  
        const onSubmit = (data) => {
        const admin = {
            name: data.Name,
            faculty_id: data.FacultyID,
            role: data.Role,
            email: data.Email,
            password: data.Password,
        };
        fetch("http://localhost:8080/admin/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin),
        })
        .then((response) => {
                    if (response.ok) {
                        toast.success("Registered successfully!");
                        reset(defaultValues);
                        setTimeout(() => {
                            navigate("/LoginAdmin");
                        }, 3000);
                    } else {
                        toast.error("Failed to register. Please try again.");
                    }
                })
                .catch((error) => {
                    console.error("Error during registration:", error);
                    toast.error("An error occurred. Please try again.");
                });
        }
    return (
    <section>
        <Navbar />

        <div className="home md:px-[100px]">


            <div className="flex items-center justify-center h-[80vh] w-[100%]">
                <Card className={'w-[400px]'}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h4" color="black" className={'flex item center justify-center pt-3'}>
                            Register Admin
                        </Typography>

                        <CardBody className="flex flex-col gap-4">
                            <div>
                                <Controller
                                    name="Name"
                                    control={control}
                                    rules={{
                                        required: "Name is required",
                                        minLength: {
                                            value: 5,
                                            message: "Name should be at least 5 characters long"
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
                                    name="Role" 
                                    control={control}
                                    rules={{ required: "Role selection is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Select Role" 
                                            animate={{
                                                mount: { y: 0 },
                                                unmount: { y: 25 },
                                            }}
                                            color="blue"
                                            error={!!errors.Role} 
                                        >
                                            <Option value="">Select an option</Option>
                                            <Option value="special_lab">Special Lab</Option>
                                            <Option value="mentor">Mentor</Option>
                                        </Select>
                                    )}
                                />
                                {errors?.Role?.message && <span className="text-red-500 text-xs">{errors.Role.message}</span>}

                            </div>

                            <div>
                                <Controller
                                    name="Email"
                                    control={control}
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Invalid email address"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Email"
                                            type="text"
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
                            <Button type="submit" variant="text" className={'bg-light-blue-800 text-white hover:bg-light-blue-700'} fullWidth>
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

export default RegisterAdmin;
