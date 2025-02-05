import { useEffect,useState } from "react";
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import {Users} from "../components/Users"
import axios from "axios";

const Dashboard=()=>{
    const [Val,setVal]=useState(0);
    useEffect(()=>{
        setVal(axios.get("http://localhost:3000/api/v1/account/balance"))
    },[])
    console.log(Val)
    return(
        <>
            <Appbar />
            <div className="m-8">
                <Balance value="1000" />
                <Users />
            </div>
        </>
    )
}

export default Dashboard;