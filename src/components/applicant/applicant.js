import axios from "axios";
import {toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import Sidebar from "../sidebar/sidebar";
import { useState,useEffect } from "react";
import { Table, Box, Button,TableRow,TableBody,TableCell,TableHead,TableContainer }from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useHistory } from "react-router-dom";
const Applicant=()=>{
    const history =useHistory();
    const [applicant,setApplicant]=useState([]);  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const getApplicant=()=>{
        axios.get(`${process.env.REACT_APP_ADMIN_PANEL_URL}getapplicant`).then((res)=>{
            console.log(res.data.message);
            setApplicant(res.data.message);
        }).catch=(e)=>{
            console.log('err',e);
        }
    }
    useEffect(()=>getApplicant(),[]);
   
    const deleteApplicant=(id)=>{ 
        axios.delete(`${process.env.REACT_APP_ADMIN_PANEL_URL}deleteapplicant`,{params:{id:id}}).then((res)=>{
            toast.success('Deleted successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
            getApplicant();
        }).catch=(e)=>{
             console.log(e);
        }
    }
    const viewApplicant=(id)=>{
        console.log('applicant',id);
        history.push(`/viewapplicant/${id}`);
    }
    const heading=['Position','Name','Experience','Email','Resume','Actions'];
    
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
                            {heading.map((head,key)=>(
                                <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left" key={key}>{head}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{applicant.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
                        <TableRow key={index}>
                                <TableCell sx={{width:'300px'}} align="left">{row.job_title}</TableCell>
                                <TableCell sx={{width:'150px'}} align="left">{row.name}</TableCell>
                                <TableCell sx={{width:'150px'}} align="center">{row.experience}</TableCell>
                                <TableCell sx={{width:'150px'}} align="left">{row.email}</TableCell>
                                <TableCell sx={{width:'150px'}} align="left">{row.resume}</TableCell>
                                <TableCell sx={{width:'200px'}}>
                                    <Button onClick={(e)=>deleteApplicant(row.id)} sx={{color:'red'}}><DeleteTwoToneIcon/></Button>
                                    <Button onClick={(e)=>viewApplicant(row.id)} sx={{color:'black'}}><VisibilityOutlinedIcon/></Button>
                                </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>  
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={applicant.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> 
                                
        </Box>
    </div>
    );
}
export default Applicant;
