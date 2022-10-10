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
    const[position,setPosition]=useState(201);
    const[location,setLocation]=useState('');
    const[details,setDetail]=useState('');
    const[experience,setExperience]=useState('');
    const[expire,setExpire]=useState('');
    // const getPositions=()=>{
    //     axios.get('http://localhost:3001/getposition').then((res)=>{
    //         console.log(res.data.message);
    //         setPosition(res.data.message);
    //     }).catch=(e)=>{ 
    //         console.log('err',e);
    //     }
    // }
    // useEffect(()=>getPositions(),[]);
        const handleChange = (event) => {
            console.log('selected',event.target.value);
            setPosition(event.target.value);
          };
    const addJobFunction=()=>{
        if((position!=='')&&(details!=='')&&(location!=='')){
            axios.post('http://localhost:3001/addjobs',{
               position_id:position,
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
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={position}
                    label="position"
                    onChange={handleChange}
                >
                    <MenuItem value={201}>Front End Developer</MenuItem>
                    <MenuItem value={202}>Back End Developer</MenuItem>
                    <MenuItem value={203}>Data Scientist</MenuItem>
                    <MenuItem value={204}>Full Stack Developer</MenuItem>
                    <MenuItem value={205}>Software Tester</MenuItem>
                    <MenuItem value={206}>Hr Manager</MenuItem>
                    <MenuItem value={207}>Legal adviser</MenuItem>
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