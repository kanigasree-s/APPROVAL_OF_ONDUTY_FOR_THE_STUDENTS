import React, { useState, useEffect, useRef } from "react";
import { ImProfile } from "react-icons/im";
import { MdOutlineFlight } from "react-icons/md";
import { TbHeartRateMonitor } from "react-icons/tb";
import { RiParentFill } from "react-icons/ri";
import { PiStepsFill } from "react-icons/pi";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const defaultValues = {
  LabName: "",
  FacultyName: "",
};

const Lab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const fileInputRef = useRef(null); 

  useEffect(() => {
    const storedRollNo = localStorage.getItem("RollNo");
    const storedName = localStorage.getItem("name");
    const storedId = localStorage.getItem("Id");

    if (storedRollNo && storedName && storedId) {
      setRollNo(storedRollNo);
      setName(storedName);
      setId(storedId);
    } else {
      console.log("User data not found");
    }
  }, []);

  const { handleSubmit, control, reset, resetField, formState: { errors } } = useForm({
    defaultValues,
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!fileInputRef.current.files[0]) {
      toast.error("Registration proof file is required.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("rollno", rollNo);
    formData.append("labname", data.LabName);
    formData.append("facultyname", data.FacultyName);
    formData.append("registrationproof", fileInputRef.current.files[0]); 
    try {
      const response = await fetch("http://localhost:8080/student/lab/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Proof submitted successfully!");
        reset(defaultValues); // Reset the form fields
        resetField("registrationproof"); // Reset the file input field
        fileInputRef.current.value = ""; // Clear the file input programmatically
        setTimeout(() => {
          navigate("/Mentor");
        }, 3000);
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`w-20 md:w-64 bg-blue-800 text-white h-screen transition-width duration-300 ${isOpen ? "w-64" : "w-20"}`}>
        <div className="flex justify-between items-center py-10 px-4">
          <h2 className={`text-2xl md:text-3xl font-bold md:block ${isOpen ? "block" : "hidden"}`}>Dashboard</h2>
          <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoCloseSharp size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <Link to={"/Profile"}>
              <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                <ImProfile size={24} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Profile</span>
              </li>
            </Link>
            <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
              <MdOutlineFlight size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Apply OD</span>
            </li>
            <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
              <TbHeartRateMonitor size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Special Lab Approval</span>
            </li>
            <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
              <RiParentFill size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Parent Approval</span>
            </li>
            <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
              <PiStepsFill size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Mentor Approval</span>
            </li>
            <Link to={"/LoginStudent"}>
              <li className="flex items-center text-lg md:text-xl p-4 hover:bg-blue-700 cursor-pointer">
                <FaArrowRightFromBracket size={24} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Logout</span>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="flex items-center justify-center h-[95vh] w-[100%]">
        <Card className={"w-[500px] bg-blue-400"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" color="black" className={"flex item center justify-center pt-3"}>
              Special Lab Approval
            </Typography>
            <CardBody className="flex flex-col gap-4">
              <Controller
                name="LabName"
                control={control}
                rules={{ required: "Special Lab Name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Special Lab Name"
                    placeholder="Enter lab name with code"
                    type="text"
                    color="white"
                    size="lg"
                    error={!!errors.LabName}
                  />
                )}
              />
              {errors?.LabName?.message && <span className="text-red-500 text-xs">{errors.LabName.message}</span>}
              <Controller
                name="FacultyName"
                control={control}
                rules={{ required: "Faculty Name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Faculty Name"
                    placeholder="Enter Faculty Name"
                    type="text"
                    color="white"
                    size="lg"
                    error={!!errors.FacultyName}
                  />
                )}
              />
              {errors?.FacultyName?.message && <span className="text-red-500 text-xs">{errors.FacultyName.message}</span>}
              <div>
                <label htmlFor="registrationProof">Registration Proof</label>
                <input
                  ref={fileInputRef}
                  id="registrationProof"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-2 w-full border border-gray-300 rounded-lg"
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                variant="text"
                className={"font-bold bg-amber-100 text-black hover:bg-white hover:text-blue-800 text-xl"}
                fullWidth
              >
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

export default Lab;
