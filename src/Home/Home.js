import React from 'react'
import './Home.css';
import Navbar from "./Navbar";
import { IoMdArrowDropdown } from "react-icons/io";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button, CardFooter,
} from "@material-tailwind/react";
import {Footer} from "./Footer";

export const Home = () => {
    return (
        <section>
            <Navbar/>

            <div className="home md:px-[100px]">
                <div className="college-name sm:pt-[30vh]">
                    <h1 className="name animate-fadeIn"><span className={'highlightFirstLetter'}>B</span>ANNARI AMMAN <span className={'highlightFirstLetter'}>I</span>NSTITUTE OF <span className={'highlightFirstLetter'}>T</span>ECHNOLOGY</h1>
                    <h6 className="od-approval animate-fadeIn3s">APPROVAL OF ON DUTY  <IoMdArrowDropdown className="animate-bounce mt-4 mx-auto text-3xl text-white" /> <IoMdArrowDropdown className="animate-bounce mx-auto text-3xl text-light-blue-800" /></h6>
                </div>
            </div>

            <div className='md:px-[100px]'>
                <div className='my-20'>
                    <Card className="w-full flex-col md:flex-row">
                        <CardHeader
                            shadow={false}
                            floated={false}
                            className="m-0 w-[100%] md:w-2/5 shrink-0 rounded-r-none"
                        >
                            <img
                                src="https://www.bitsathy.ac.in/wp-content/uploads/About-Card-scaled.jpg"
                                alt="card-image"
                                className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h6" color="gray" className="mb-4 uppercase">
                                About the Campus
                            </Typography>
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                Lyft launching cross-platform service this week
                            </Typography>
                            <Typography color="gray" className="mb-8 font-normal">
                                Bannari Amman Institute of Technology is an Autonomous, Self-financing Engineering College,
                                Approved by AICTE, New Delhi and Affiliated to Anna University, Chennai. Nestled on the
                                banks of The River Bhavani, BIT campus provides environment for learning in harmony with
                                nature, away from the odds of the city life. The spacious and the earth hugging buildings
                                punctuated with landscaped courtyards and pathways are designed to emphasise the business
                                ethics and or characteristics of an excellent centre for learning. The Campus hosts well
                                planned academic blocks, computer centres, lecture halls, libraries, laboratories,
                                conference halls, staff quarters, hostels and students' centres. The Campus also houses a
                                co-operative store, ATM (Axis, SBI and KVB) and a clinic to attend to the general health of
                                the students and staff.
                            </Typography>
                        </CardBody>
                    </Card>
                </div>

                <div className='grid grid-cols md:grid-cols-3 gap-4 gap-y-10 md:gap-y-2 my-20'>
                    <div className="group">
                        <Card className="hover:bg-light-blue-600">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2 group-hover:text-white">
                                    Special Labs
                                </Typography>
                                <Typography className="group-hover:text-white">
                                    Fostering innovations and advancing skills for a better tomorrow.
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <a href="#" className="inline-block">
                                    <Button size="sm" variant="text" className="flex items-center gap-2 group-hover:text-white">
                                        Learn More
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-4 w-4 group-hover:text-white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="group">
                        <Card className="hover:bg-light-blue-600">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2 group-hover:text-white">
                                    Placement
                                </Typography>
                                <Typography className="group-hover:text-white">
                                    Realizing what you are good at starts with finding what you're passionate.
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <a href="#" className="inline-block">
                                    <Button size="sm" variant="text" className="flex items-center gap-2 group-hover:text-white">
                                        Learn More
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-4 w-4 group-hover:text-white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="group">
                        <Card className="hover:bg-light-blue-600">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2 group-hover:text-white">
                                    Achievements
                                </Typography>
                                <Typography className="group-hover:text-white">
                                    Every achievement is a servitude. It compels us to a higher achievement.
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <a href="#" className="inline-block">
                                    <Button size="sm" variant="text" className="flex items-center gap-2 group-hover:text-white">
                                        Learn More
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-4 w-4 group-hover:text-white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                <div className='grid grid-col md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-10 md:gap-y-2 items-center justify-center my-20'>
                    <div>
                        <div className="flex items-center justify-center">
                            <img src="https://www.bitsathy.ac.in/wp-content/uploads/Happy-Students.png" alt="Happy Students" className="h-16 w-auto hover:scale-110"/>
                            <span className="ml-2">7,427</span>
                            <span className="count-cont ml-2">HAPPY STUDENTS</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center">
                            <img src="https://www.bitsathy.ac.in/wp-content/uploads/success-alumni.png" alt="Happy Students" className="h-16 w-auto hover:scale-110"/>
                            <span className="ml-2">27,840</span>
                            <span className="count-cont ml-2">SUCCESSFUL ALUMNI</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center">
                            <img src="https://www.bitsathy.ac.in/wp-content/uploads/staffs-2.png" alt="Happy Students" className="h-16 w-auto hover:scale-110"/>
                            <span className="ml-2">456</span>
                            <span className="count-cont ml-2">DEDICATED STAFF</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center">
                            <img src="	https://www.bitsathy.ac.in/wp-content/uploads/awards.png" alt="Happy Students" className="h-16 w-auto hover:scale-110"/>
                            <span className="ml-2">1,329</span>
                            <span className="count-cont ml-2">AWARDS + ACHIEVEMENTS</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </section>
    )
}

export default Home;
