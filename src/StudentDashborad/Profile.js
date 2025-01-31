import React, { useEffect, useState } from "react";
import { ImProfile } from "react-icons/im";
import { MdOutlineFlight } from "react-icons/md";
import { TbHeartRateMonitor } from "react-icons/tb";
import { RiParentFill } from "react-icons/ri";
import { PiStepsFill } from "react-icons/pi";
import { FaBars } from "react-icons/fa";
import {IoCloseSharp} from 'react-icons/io5';
import {Card,CardBody,Button,CardFooter} from "@material-tailwind/react";
import { useLocation,Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Profile = () => {
    const [isOpen,setIsOpen]=useState(false)
    const { state } = useLocation();  // Get the RollNo from location state
    const { RollNo,name} = state || {};  // Get RollNo from state, default to empty if not found
    const [student, setStudent] = useState(null);

    useEffect(() => {
        if (RollNo) {
            fetch(`http://localhost:8080/student/get/${RollNo}`, {
                method: "GET",
            })
            .then((response) => response.json())
            .then((studentData) => {
                setStudent(studentData);  // Set the student data from API response
            })
            .catch((error) => {
                console.error("Error fetching student data:", error);
            });
        }
    }, [RollNo],name);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`w-20 md:w-64 bg-blue-800 text-white h-screen transition-width duration-300 ${isOpen?"w-64":"w-20"}`}>
                {/* Header */}
                <div className="flex justify-between items-center py-10 px-4">
                <h2 className={`text-2xl md:text-3xl font-bold  md:block ${isOpen ? "block" : "hidden"}`}>Dashboard</h2>
                    <button className="block md:hidden" onClick={()=>setIsOpen(!isOpen)}>
                        {isOpen?<IoCloseSharp size={24}/>:<FaBars size={24} />}
                    </button>
                </div>
                {/* Navigation */}
                <nav className="mt-4">
                    <ul>
                        <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                            <ImProfile size={26} />
                            <span className={`font-bold ml-4  md:block ${isOpen?"block":"hidden"}`}>Profile</span>
                        </li>
                       <Link to= {{pathname:'/Applyod', state: { RollNo, name: student.name }}}><li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                            <MdOutlineFlight size={24} />
                            <span className={`ml-4  md:block ${isOpen?"block":"hidden"}`}>Apply OD</span>
                        </li></Link>
                        <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                            <TbHeartRateMonitor size={24} />
                            <span className={`ml-4  md:block ${isOpen?"block":"hidden"}`}>Special Lab Approval</span>
                        </li>
                        <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                            <RiParentFill size={24} />
                            <span className={`ml-4  md:block ${isOpen?"block":"hidden"}`}>Parent Approval</span>
                        </li>
                        <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                            <PiStepsFill size={24} />
                            <span className={`ml-4  md:block ${isOpen?"block":"hidden"}`}>Mentor Approval</span>
                        </li>
                         <Link to={"/LoginStudent"}><li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                                                    <FaArrowRightFromBracket size={24} />
                                                    <span className={`ml-4  md:block ${isOpen?"block":"hidden"}`}>Logout</span>
                         </li></Link>
                    </ul>
                </nav>
            </div>
            <div className="flex items-center justify-center h-[80vh] w-[100%] ">
                    <Card className="w-[500px] bg-blue-400">
                        <CardBody className="flex flex-col gap-4">
                        <div className="flex flex-col gap-7">
                            <table className="table-auto w-full space-y-4">
                            <tr>
                                <td className="px-4 py-2 text-left"><span className="font-bold text-white text-xl">Name</span></td>
                                <td className="px-4 py-2 text-left"><span className="text-white text-lg">{student.name}</span></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-left"><span className="font-bold text-white text-xl">Roll Number</span></td>
                                <td className="px-4 py-2 text-left"><span className="text-white text-lg">{student.rollno}</span></td>
                           </tr>
                            <tr>
                                <td className="px-4 py-2 text-left"><span className="font-bold text-white text-xl">Year</span></td>
                                <td className="px-4 py-2 text-left"> <span className="text-white text-lg">{student.year}</span></td>
                           </tr>
                            <tr>
                                <td className="px-4 py-2 text-left"><span className="font-bold text-white text-xl">Email ID</span></td>
                                <td className="px-4 py-2 text-left"><span className="text-white text-lg">{student.email}</span></td>
                           </tr>
                            </table>
                        </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                        <Link to={'/'}><Button type="submit" variant="text" className={`font-bold bg-amber-100 text-black hover:bg-white hover:text-blue-800 text-xl`} fullWidth>
                                    Logout
                                </Button></Link>
                        </CardFooter>
                    </Card>
            </div>
        </div>
    );
};

export default Profile;
