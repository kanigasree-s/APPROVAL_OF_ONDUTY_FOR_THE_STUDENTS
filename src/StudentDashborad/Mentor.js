import React, {useState ,useEffect} from "react";
import { ImProfile } from "react-icons/im";
import { MdOutlineFlight } from "react-icons/md";
import { TbHeartRateMonitor } from "react-icons/tb";
import { RiParentFill } from "react-icons/ri";
import { PiStepsFill } from "react-icons/pi";
import { FaBars } from "react-icons/fa";
import {IoCloseSharp} from 'react-icons/io5';
import { Link,useNavigate} from "react-router-dom";
import { Controller,useForm} from "react-hook-form";
import { Button, Card, CardBody, CardFooter, Input,Typography,Select,Option } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRightFromBracket } from "react-icons/fa6";

const defaultValues = {
    Name:'',
    RollNo:'',
    MentorName:'',
    MentorEmail:'',
    ParentCommunication:''
};

const Mentor = () => {
    const [isOpen,setIsOpen]=useState(false)
    const [rollNo, setRollNo] = useState('');
    const [name, setName] = useState('');
  
    useEffect(() => {
      const storedRollNo = localStorage.getItem('RollNo');
      const storedName = localStorage.getItem('name');
  
      if (storedRollNo && storedName) {
        setRollNo(storedRollNo);
        setName(storedName);
      } else {
        console.log('User data not found');
      }
    }, []);
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
            defaultValues,
            mode:'onTouched'
        });
        const navigate = useNavigate();
        const onSubmit = async (data) => {
            const mentor = {
              name: name,
              rollno: rollNo,
              mentorname:data.MentorName,
              mentormailid:data.MentorEmail,
              parentcommunication:data.ParentCommunication
            };
          
            fetch('http://localhost:8080/mentor/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mentor)
              }) 
              .then((response) => {
                         if (response.ok) {
                             toast.success("Submitted successfully!");
                             reset(defaultValues);
                             setTimeout(() => {
                                 navigate("/LoginStudent");
                             }, 3000);
                         } else {
                             toast.error("Failed to submit. Please try again.");
                         }
                     })
                     .catch((error) => {
                         console.error("Error during Submission:", error);
                         toast.error("An error occurred. Please try again.");
                     });
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
                        <Link to={"/Profile"}><li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                            <ImProfile size={24} />
                            <span className={`ml-4  md:block ${isOpen?"block":"hidden"}`}>Profile</span>
                        </li></Link>
                        <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                            <MdOutlineFlight size={24} />
                            <span className={`ml-4  md:block ${isOpen?"block":"hidden"}`}>Apply OD</span>
                        </li>
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
                         <Link to={"/LoginStudent"}>
                         <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                         <FaArrowRightFromBracket size={24} />
                         <span className={`ml-4  md:block ${isOpen?"block":"hidden"}`}>Logout</span>
                        </li></Link>
                    </ul>
                </nav>
            </div>
            <div className="flex items-center justify-center h-[95vh] w-[100%]">
                <Card className={'w-[500px] bg-blue-400'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Typography variant="h5" color="black" className={'flex item center justify-center pt-3'}>
                                 Mentor Approval
                            </Typography>
                            <CardBody className="flex flex-col gap-6">
                                <div>
                                <Controller
                                    name="MentorName"
                                    control={control}
                                    rules={{ required: "Mentor Name is required" }}
                                    render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Mentor Name"
                                        placeholder="Enter mentor name with initial atlast"
                                        type="text"
                                        color="white"
                                        size="lg"
                                        error={!!errors.MentorName}
                                    />
                                    )}
                                />
                                {errors?.MentorName?.message && (
                                    <span className="text-red-500 text-xs">{errors.MentorName.message}</span>
                                )}
                                </div>

                            <div>
                                <Controller
                                        name="MentorEmail"
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
                                                label="Mentor Email"
                                                type="email"
                                                color="white"
                                                size="lg"
                                                error={!!errors.MentorEmail}
                                            />
                                        )}
                                    />
                                    {errors?.MentorEmail?.message && <span className={'text-red-500 text-xs'}>{errors.MentorEmail.message}</span>}
                            </div>
                            <div>
                                    <Controller
                                    name="ParentCommunication"
                                    control={control}
                                    rules={{ required: "Parent communication is required" }}
                                    render={({ field }) => (
                                        <Select
                                        {...field}
                                        label={<span style={{ color: 'white' }}>Parent Communication</span>} 
                                        animate={{ mount: { y: 0 }, unmount: { y: 25 } }}
                                        style={{ color: 'white' }} 
                                        error={!!errors.ParentCommunication}
                                        >
                                        <Option value="" className="text-white ">
                                            Select an option
                                        </Option>
                                        <Option value="Yes">
                                            Yes
                                        </Option>
                                        <Option value="No" >
                                            No
                                        </Option>
                                        </Select>
                                    )}
                                    />
                                    {errors?.Type?.message && (
                                    <span className="text-red-500 text-xs">{errors.Type.message}</span>
                                    )}
                                </div>                                                                       
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button type="submit" variant="text" className={'font-bold bg-amber-100 text-black hover:bg-white hover:text-blue-800 text-xl'}  fullWidth>
                                    Submit
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
                <ToastContainer />
        </div>
    );
};

export default Mentor;
