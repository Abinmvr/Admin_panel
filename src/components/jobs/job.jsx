import './job.css';
import axios from "axios";
import {toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import Sidebar from "../sidebar/sidebar";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Box, Button,TableRow,TableBody,TableCell,TableHead,TableContainer }from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';

const Jobs=()=>{
    const history =useHistory();
    const [jobs,setJobs]=useState([])
    const getJobs=()=>{
        axios.get('http://localhost:3001/getjobs').then((res)=>{
            console.log(res.data.message);
            setJobs(res.data.message);
        }).catch=(e)=>{
            console.log('err',e);
        }
    }
    useEffect(()=>getJobs(),[]);
    
    const editJobs=(id)=>{
        history.push(`/editJobs/${id}`);
    }
    const updateJobs=()=>{
        history.push('/addjobs');
    }
    const deleteJobs=(id)=>{ 
        // console.log('delete',id);
        axios.delete('http://localhost:3001/deleteJobs',{params:{id:id}}).then((res)=>{
            toast.success('Deleted successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
            getJobs();
        }).catch=(e)=>{
             console.log(e);
        }
    }
   
    return(
        <div>   
        <Box display={'flex'}
        flexDirection={"column"}
        marginLeft={260} 
        alignItems={'center'} 
        margin={'auto'}>  
            <Sidebar/>
            <Button onClick={updateJobs} sx={{color:'green'}}>Add<AddCircleOutlineTwoToneIcon/></Button>
            <TableContainer component={Paper}>
                <Table sx={{ marginLeft:'240px',
                            maxWidth:'900px'
                        }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{fontWeight:'bold',width:'200px'}}>Position </TableCell>
                            <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left">Location</TableCell>
                            <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left">Experience</TableCell>
                            <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left">Details</TableCell>
                            <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left">Expire Date</TableCell>
                            <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{jobs.map((row,index) => (
                        <TableRow key={index}>
                                <TableCell sx={{width:'150px'}} align="left">{row.position}</TableCell>
                                <TableCell sx={{width:'150px'}} align="left">{row.location}</TableCell>
                                <TableCell sx={{width:'150px'}} align="center">{row.experience_in_years}</TableCell>
                                <TableCell sx={{width:'150px'}} align="left">{row.description}</TableCell>
                                <TableCell sx={{width:'150px'}} align="left">{row.expire_date.substring(0,10)}</TableCell>
                                <TableCell sx={{width:'150px'}}>
                                    <Button onClick={(e)=>editJobs(row.id)} sx={{color:'blue'}}><EditTwoToneIcon/></Button>
                                    <Button onClick={(e)=>deleteJobs(row.id)} sx={{color:'red'}}><DeleteTwoToneIcon/></Button>
                                </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> 
                                
        </Box>
    </div>
    );
}
export default Jobs;
