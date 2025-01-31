import React, {useState ,useEffect} from "react";
import { ImProfile } from "react-icons/im";
import { MdOutlineFlight } from "react-icons/md";
import { TbHeartRateMonitor } from "react-icons/tb";
import { RiParentFill } from "react-icons/ri";
import { PiStepsFill } from "react-icons/pi";
import { FaBars} from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {IoCloseSharp} from 'react-icons/io5';
import { Link,useNavigate} from "react-router-dom";
import { Controller,useForm} from "react-hook-form";
import { Button, Card, CardBody, CardFooter, Input, Option, Select, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultValues = {
    Name:'',
    RollNo:'',
    AcademicFA: '',
    PlacementFA: '',
    Type: '',
    EventDetails: '',
    FromDateTime: '',
    ToDateTime:'',
    NumberOfDays:''
};

const Applyod = () => {
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
            const applyod = {
              name: name,
              rollno: rollNo,
              academicfa: data.AcademicFA,
              placementfa: data.PlacementFA,
              type: data.Type,
              event_details: data.EventDetails,
              from_date_time: data.FromDateTime,
              to_date_time: data.ToDateTime,
              number_of_days: data.NumberOfDays
            };
          
            fetch('http://localhost:8080/applyod/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(applyod)
              }) 
              .then((response) => {
                    if (response.ok) {
                        response.json().then((id) => {
                            localStorage.setItem('Id', id);
                            console.log("ID:",id);
                            toast.success("Od Applied successfully!");
                            reset(defaultValues);
                            setTimeout(() => {
                                navigate("/Lab");
                            }, 3000);
                        });
                    } else {
                             toast.error("Failed to Apply OD. Please try again.");
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
                        <Link to={"/LoginStudent"}><li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
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
                                Apply OD
                            </Typography>
                            <CardBody className="flex flex-col gap-4">
                                <div>
                                    <Controller
                                    name="AcademicFA"
                                    control={control}
                                    rules={{
                                        required: "Academic FA% is required",
                                        min: { value: 50, message: "Academic FA% should be at least 50%" },
                                        max: { value: 100, message: "Academic FA% cannot exceed 100%" },
                                      }}
                                    render={({ field }) => (
                                        <Input
                                        {...field}
                                        label="Academic FA%"
                                        placeholder="Enter your FA%"
                                        type="number"
                                        color="white"
                                        size="lg"
                                        error={!!errors.AcademicFA}
                                        />
                                    )}
                                    />
                                    {errors?.AcademicFA?.message && (
                                    <span className="text-red-500 text-xs">{errors.AcademicFA.message}</span>
                                    )}
                                </div>

                                <div>
                                    <Controller
                                    name="PlacementFA"
                                    control={control}
                                    rules={{
                                        required: "Placement FA% is required",
                                        min: { value: 50, message: "Placement FA% should be at least 50%" },
                                        max: { value: 100, message: "Placement FA% cannot exceed 100%" },
                                      }}
                                    render={({ field }) => (
                                        <Input
                                        {...field}
                                        label="Placement FA%"
                                        placeholder="Enter your FA%"
                                        type="number"
                                        color="white"
                                        size="lg"
                                        error={!!errors.PlacementFA}
                                        />
                                    )}
                                    />
                                    {errors?.PlacementFA?.message && (
                                    <span className="text-red-500 text-xs">{errors.PlacementFA.message}</span>
                                    )}
                                </div>

                                <div>
                                    <Controller
                                    name="Type"
                                    control={control}
                                    rules={{ required: "Type is required" }}
                                    render={({ field }) => (
                                        <Select
                                        {...field}
                                        label={<span style={{ color: 'white' }}>Type</span>} 
                                        animate={{ mount: { y: 0 }, unmount: { y: 25 } }}
                                        style={{ color: 'white' }} 
                                        error={!!errors.Type}
                                        >
                                        <Option value="" className="text-white ">
                                            Select an option
                                        </Option>
                                        <Option value="Internal">
                                            Internal
                                        </Option>
                                        <Option value="External" >
                                            External
                                        </Option>
                                        </Select>
                                    )}
                                    />
                                    {errors?.Type?.message && (
                                    <span className="text-red-500 text-xs">{errors.Type.message}</span>
                                    )}
                                </div>

                                <div>
                                    <Controller
                                    name="EventDetails"
                                    control={control}
                                    rules={{ required: "Event details are required" }}
                                    render={({ field }) => (
                                        <Input
                                        {...field}
                                        label="Event Details"
                                        placeholder="Enter event details"
                                        type="text"
                                        color="white"
                                        size="lg"
                                        error={!!errors.EventDetails}
                                        />
                                    )}
                                    />
                                    {errors?.EventDetails?.message && (
                                    <span className="text-red-500 text-xs">{errors.EventDetails.message}</span>
                                    )}
                                </div>

                                <div>
                                    <Controller
                                    name="FromDateTime"
                                    control={control}
                                    rules={{ required: "Start date and time are required" }}
                                    render={({ field }) => (
                                        <Input
                                        {...field}
                                        label="From date&time"
                                        placeholder="dd-mm-yyyy --:-- --"
                                        type="datetime-local"
                                        color="white"
                                        size="lg"
                                        error={!!errors.FromDateTime}
                                        />
                                    )}
                                    />
                                    {errors?.FromDateTime?.message && (
                                    <span className="text-red-500 text-xs">{errors.FromDateTime.message}</span>
                                    )}
                                </div>

                                <div>
                                    <Controller
                                    name="ToDateTime"
                                    control={control}
                                    rules={{ required: "End date and time are required" }}
                                    render={({ field }) => (
                                        <Input
                                        {...field}
                                        label="To date&time"
                                        placeholder="dd-mm-yyyy --:-- --"
                                        type="datetime-local"
                                        color="white"
                                        size="lg"
                                        error={!!errors.ToDateTime}
                                        />
                                    )}
                                    />
                                    {errors?.ToDateTime?.message && (
                                    <span className="text-red-500 text-xs">{errors.ToDateTime.message}</span>
                                    )}
                                </div>

                                <div>
                                    <Controller
                                    name="NumberOfDays"
                                    control={control}
                                    rules={{
                                        required: "Number of days is required",
                                        min: { value: 1, message: "Number of days cannot be negative or zero" },
                                        max: { value: 50, message: "Number of days cannot exceed 50" },
                                      }}
                                    render={({ field }) => (
                                        <Input
                                        {...field}
                                        label="Number of days"
                                        placeholder="Enter no of days"
                                        type="number"
                                        color="white"
                                        size="lg"
                                        error={!!errors.NumberOfDays}
                                        />
                                    )}
                                    />
                                    {errors?.NumberOfDays?.message && (
                                    <span className="text-red-500 text-xs">{errors.NumberOfDays.message}</span>
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

export default Applyod;
