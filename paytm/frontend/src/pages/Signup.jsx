import "./styling.css"
import  Heading  from "../components/heading"
import  SubHeading  from "../components/subheading"
import InputBox from "../components/Inputs"
import { useState } from "react"
import Button from "../components/Button"
import Bottomwarning from "../components/bottomwarning"
import axios from "axios"

const SignUp=()=>{
    const [Name,setName]=useState("");
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");
    console.log(Name);
    console.log(Email);
    console.log(Password)

    return(
        <>
            <div className="bg-slate-300 h-screen flex justify-center">
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                        <Heading label={"Sign Up"} />
                        <SubHeading label={"Enter your information to create an account"} />
                        <InputBox label="Name" placeholder="Declan" onChange={(e=>setName(e.target.value))}/>
                        <InputBox label="Email" placeholder="declan123@gmail.com" onChange={(e=>setEmail(e.target.value))}/>
                        <InputBox label="Password" placeholder="123456" onChange={(e=>setPassword(e.target.value))}/>
                        <div className="pt-4">
                            <Button onClick={async ()=>{
                                const resp=await axios.post("http://localhost:3000/api/v1/user/registration",{
                                    name:Name,
                                    email:Email,
                                    password:Password
                            });
                            console.log(resp)
                            localStorage.setItem("token",resp.data.token);
                            }} label="submit" />
                        </div>
                        <Bottomwarning label="Don't have an Account?" buttonText="Sign In" to="/signin" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp