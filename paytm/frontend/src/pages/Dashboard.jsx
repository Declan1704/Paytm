import { useEffect,useState } from "react";
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import {Users} from "../components/Users"
import axios from "axios";

const Dashboard=()=>{
    const [Val,setVal]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                authorization:localStorage.getItem("token")
            }
        }).then(function(res){
            setVal(res.data.balance)
        })
    },[])
    console.log(Val)
    return(
        <>
            <Appbar />
            <div className="m-8">
                <Balance value={Val} />
                <Users />
            </div>
        </>
    )
}

export default Dashboard;