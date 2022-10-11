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
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

const Jobs=()=>{
    const history =useHistory();
    const [jobs,setJobs]=useState([]);  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const getJobs=()=>{
        axios.get(`${process.env.REACT_APP_ADMIN_PANEL_URL}getjobs`).then((res)=>{
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
        axios.delete(`${process.env.REACT_APP_ADMIN_PANEL_URL}deleteJobs`,{params:{id:id}}).then((res)=>{
            toast.success('Deleted successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
            getJobs();
        }).catch=(e)=>{
             console.log(e);
        }
    }
    
    const heading=['Position','Location','Experience/Year','Details','Expire Date','Actions'];
   
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
                        <TableRow >{heading.map((head,key)=>(
                                <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left" key={key}>{head}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
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
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={jobs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> 
                  
        </Box>
    </div>
    );
}
export default Jobs;
