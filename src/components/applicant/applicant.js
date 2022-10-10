import axios from "axios";
import {toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import Sidebar from "../sidebar/sidebar";
import { useState,useEffect } from "react";
import { Table, Box, Button,TableRow,TableBody,TableCell,TableHead,TableContainer }from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
const Applicant=()=>{
    const [applicant,setApplicant]=useState([])
    const getApplicant=()=>{
        axios.get('http://localhost:3001/getapplicant').then((res)=>{
            console.log(res.data.message);
            setApplicant(res.data.message);
        }).catch=(e)=>{
            console.log('err',e);
        }
    }
    useEffect(()=>getApplicant(),[]);
   
    const deleteApplicant=(id)=>{ 
        axios.delete('http://localhost:3001/deleteapplicant',{params:{id:id}}).then((res)=>{
            toast.success('Deleted successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
            getApplicant();
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
            <TableContainer component={Paper}>
                <Table sx={{ marginLeft:'240px',
                            maxWidth:'900px'
                        }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{fontWeight:'bold',width:'200px'}}>Position </TableCell>
                            <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left">Name</TableCell>
                            <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left">Experience</TableCell>
                            <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left">Email</TableCell>
                            <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left">Resume</TableCell>
                            <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{applicant.map((row,index) => (
                        <TableRow key={index}>
                                <TableCell sx={{width:'300px'}} align="left">{row.job_title}</TableCell>
                                <TableCell sx={{width:'150px'}} align="left">{row.name}</TableCell>
                                <TableCell sx={{width:'150px'}} align="center">{row.experience}</TableCell>
                                <TableCell sx={{width:'150px'}} align="left">{row.email}</TableCell>
                                <TableCell sx={{width:'150px'}} align="left">{row.resume}</TableCell>
                                <TableCell sx={{width:'150px'}}>
                                    <Button onClick={(e)=>deleteApplicant(row.id)} sx={{color:'red'}}><DeleteTwoToneIcon/></Button>
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
export default Applicant;
