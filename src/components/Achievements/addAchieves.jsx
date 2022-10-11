import axios from "axios";
import {useState } from "react";
import {toast } from 'react-toastify';
import Sidebar from "../sidebar/sidebar";
import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Box ,Button, TextField} from "@mui/material";
const AddAchieve=()=>{
    const history=useHistory();
    const[title,setTitle]=useState('');
    const[details,setDetails]=useState('');
    const[imageLink,setImage]=useState('');
    const addAchieveFunction=()=>{
        if((title!=='')&&(details!=='')&&(imageLink!=='')){
            axios.post(`${process.env.REACT_APP_ADMIN_PANEL_URL}addachieve`,{
                title:title,
                details:details,
                image:imageLink 
            }).then((res)=>{
                const status = res.data.success;
                if(status===true){
                        toast.success('Add successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
                        history.push('/achievements');
                }
            }).catch=(e)=>{
                 console.log(e);
            }
        }
    }
    return(
        <div>
            <Box display={'flex'}
                flexDirection={"column"}
                marginLeft={260} width={'600px'}
                padding={'0px 10px'}
                margin={'auto'} 
                justifyContent={'center'}>
                <Sidebar/>  
                <TextField margin="normal" type={'text'} variant={'outlined'} placeholder={'title'} onChange={(e)=>setTitle(e.target.value)} ></TextField>
                <TextField margin="normal" type={'text'} variant={'outlined'} placeholder={'Description'} onChange={(e)=>setDetails(e.target.value)} ></TextField>
                <TextField margin="normal" type={'text'} variant={'outlined'} placeholder={'Image Link'} onChange={(e)=>setImage(e.target.value)}></TextField>
                <Button  sx={{marginTop:2 }}variant="contained" color="success" onClick={addAchieveFunction}>Add</Button> 
            </Box>
        </div>
    );
}
export default AddAchieve;