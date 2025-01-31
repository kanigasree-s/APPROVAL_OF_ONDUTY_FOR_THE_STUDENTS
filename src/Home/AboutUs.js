import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import Navbar from "./Navbar";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function AboutUs() {
    return (
        <section>
            <Navbar/>

            <div className="home md:px-[100px]">
                <div className="flex flex-col gap-3 items-center justify-start  h-[80vh] w-[100%]">
                    <h1 className={'text-xl text-white m-3'}>Developed By</h1>
                    <Card className="w-96">
                        <CardHeader floated={false} className="h-80">
                            <img src="/img/kani.jpeg" alt="profile-picture" />
                        </CardHeader>
                        <CardBody className="text-center">
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                KANIGASREE S
                            </Typography>
                            <Typography color="blue-gray" className="font-medium" textGradient>
                                FULL STACK DEVELOPER
                            </Typography>
                        </CardBody>
                        <CardFooter className="flex justify-center gap-7 pt-2">
                            <Tooltip content="Follow">
                                <Typography
                                    as="a"
                                    href="#facebook"
                                    variant="lead"
                                    color="blue"
                                    textGradient
                                >
                                    <FaFacebook className={'text-black text-xl'}/>
                                </Typography>
                            </Tooltip>
                            <Tooltip content="Follow">
                                <Typography
                                    as="a"
                                    href="#twitter"
                                    variant="lead"
                                    color="light-blue"
                                    textGradient
                                >
                                 <FaTwitter className={'text-black text-xl'}/>
                                </Typography>
                            </Tooltip>
                            <Tooltip content="Follow">
                                <Typography
                                    as="a"
                                    href="#instagram"
                                    variant="lead"
                                    color="purple"
                                    textGradient
                                >
                                  <FaInstagram className={'text-black text-xl'}/>
                                </Typography>
                            </Tooltip>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
}