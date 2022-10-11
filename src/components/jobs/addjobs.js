import axios from "axios";
import {useState,useEffect } from "react";
import {toast } from 'react-toastify';
import Sidebar from "../sidebar/sidebar";
import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Box ,Button, TextField} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const AddJobs=()=>{
    const history=useHistory();
    const[position_id,setPosition_id]=useState(201);
    const[job_title,setJobtitle]=useState([]);
    const[location,setLocation]=useState('');
    const[details,setDetail]=useState('');
    const[experience,setExperience]=useState('');
    const[expire,setExpire]=useState('');
    const getPositions=()=>{
        axios.get(`${process.env.REACT_APP_ADMIN_PANEL_URL}getposition`).then((res)=>{
            console.log(res.data.message);
            setJobtitle(res.data.message);
        }).catch=(e)=>{ 
            console.log('err',e);
        }
    }
    useEffect(()=>getPositions(),[]);
        const handleChange = (event) => {
            console.log('selected',event.target.value);
            setPosition_id(event.target.value);
          };
    const addJobFunction=()=>{
        if((position_id!=='')&&(details!=='')&&(location!=='')){
            axios.post(`${process.env.REACT_APP_ADMIN_PANEL_URL}addjobs`,{
               position_id:position_id,
               location:location,
               details:details,
               expire:expire,
               experience:experience
            }).then((res)=>{
                const status = res.data.success;
                if(status===true){
                        toast.success('Add successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
                        history.push('/job');
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
                <Sidebar/><FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">position</InputLabel>
                <Select labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={position_id}
                    label="position"
                    onChange={handleChange}>
                        {
                            job_title.map((job,key)=>(<MenuItem key={key} value={job.id}>{job.position}</MenuItem>))
                        }
                </Select>
                </FormControl>
                <TextField margin="normal" type={'text'} variant={'outlined'} placeholder={'Location'} onChange={(e)=>setLocation(e.target.value)} ></TextField>
                <TextField margin="normal" type={'text'} variant={'outlined'} placeholder={'Details'} onChange={(e)=>setDetail(e.target.value)}></TextField> 
                <TextField margin="normal" type={'text'} variant={'outlined'} placeholder={'Experience'} onChange={(e)=>setExperience(e.target.value)}></TextField> 
                <TextField margin="normal" type={'Date'} variant={'outlined'} placeholder={'Expire date'} onChange={(e)=>setExpire(e.target.value)} ></TextField> 
                <Button  sx={{marginTop:2 }}variant="contained" color="success" onClick={addJobFunction} >Add</Button> 
            </Box>
        </div>
    );
}
export default AddJobs;