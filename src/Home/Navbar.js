import {Button, Menu, MenuHandler, MenuItem, MenuList} from "@material-tailwind/react";
import {IoMdHome} from "react-icons/io";
import {MdNoteAlt} from "react-icons/md";
import {Link} from "react-router-dom";
import {RiErrorWarningFill, RiLoginBoxFill} from "react-icons/ri";
import React from "react";

const  Navbar = () => {
    return <div className={'flex flex-wrap flex-col items-center justify-center md:flex-row md:justify-between pe-5 p-3 bg-light-blue-800 sticky top-0 z-10'}>
        <div className={'flex justify-center md:justify-start'}>
            <img className={'w-[400px] ps-8'} src="https://www.bitsathy.ac.in/wp-content/themes/baiotsathycollege/assets/images/header 06.png" alt="College Logo" />
        </div>

        <div className={'flex flex-wrap items-center justify-center md:justify-start'}>
            <Link to={'/'}><Button variant={"text"} color={"white"} className={'hover:bg-amber-100 hover:text-blue-gray-600 flex items-center gap-2 text-1xl'} size={"lg"}><span><IoMdHome /></span>Home</Button></Link>

            <Menu>
                <MenuHandler>
                    <Button variant={"text"} color={"white"} className={'hover:bg-amber-100 hover:text-blue-gray-600  flex items-center gap-2 text-1xl'} size={"lg"}><span><MdNoteAlt /></span> REGISTER </Button>
                </MenuHandler>
                <MenuList>
                    <Link to={"/RegisterStudent"}><MenuItem className={'hover:bg-amber-100'}>REGISTER AS STUDENT</MenuItem></Link>
                    <Link to={"/RegisterAdmin"}><MenuItem className={'hover:bg-amber-100'}>REGISTER AS ADMIN</MenuItem></Link>
                </MenuList>
            </Menu>

            <Menu>
                <MenuHandler>
                    <Button variant={"text"} color={"white"} className={'hover:bg-amber-100 hover:text-blue-gray-600 flex items-center gap-2 text-1xl'} size={"lg"}><span><RiLoginBoxFill /></span> LOGIN </Button>
                </MenuHandler>
                <MenuList>
                    <Link to={"/LoginStudent"}><MenuItem className={'hover:bg-amber-100'}>LOGIN AS STUDENT</MenuItem></Link>
                    <Link to={"/LoginAdmin"}><MenuItem className={'hover:bg-amber-100'}>LOGIN AS ADMIN</MenuItem></Link>
                </MenuList>
            </Menu>

            <Link to={'/AboutUs'}><Button variant={"text"} color={"white"} className={'hover:bg-amber-100 hover:text-blue-gray-600 flex items-center gap-2 text-1xl'} size={"lg"}><RiErrorWarningFill /> ABOUT ME </Button></Link>
        </div>
    </div>
}

export default Navbar;