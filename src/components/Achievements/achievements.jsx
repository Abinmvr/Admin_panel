import './achieve.css';
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

const Achievement=()=>{
    const history =useHistory();
    const [achieve,setAchieve]=useState([]);  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const getAchieve=()=>{
        axios.get(`${process.env.REACT_APP_ADMIN_PANEL_URL}achieve`).then((res)=>{
            setAchieve(res.data.message);
        }).catch=(e)=>{
            console.log('err',e);
        }
    }
    useEffect(()=>getAchieve(),[]);
    
    const editAchieves=(id)=>{
        history.push(`/editachieve/${id}`);
    }
    const updateAchieves=()=>{
        history.push(`/addachieve`);
    }
    const deleteAchieves=(id)=>{ 
        axios.delete(`${process.env.REACT_APP_ADMIN_PANEL_URL}deleteachieve`,{params:{id:id}}).then((res)=>{
            toast.success('Deleted successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
            getAchieve();
        }).catch=(e)=>{
             console.log(e);
        }
    }
    const heading=['Title','Details','Image','Actions'];

    return(
        <div>   
        <Box display={'flex'}
        flexDirection={"column"}
        marginLeft={260} 
        alignItems={'center'} 
        margin={'auto'}>  
            <Sidebar/>
            <Button className='addbtn' onClick={updateAchieves} sx={{color:'green'}}>Add<AddCircleOutlineTwoToneIcon/></Button>
            <TableContainer component={Paper}>
                <Table sx={{ marginLeft:'240px',maxWidth:'800px' }} aria-label="simple table">
                    <TableHead>
                        <TableRow >{heading.map((head,key)=>(
                                <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left" key={key}>{head}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{achieve.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
                        <TableRow key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{row.title}</TableCell>
                                <TableCell align="left">{row.details}</TableCell>
                                <TableCell align="left" sx={{width:'50' }}>
                                    <div className="imagediv">
                                        <img src={row.image} alt={'achieve'} ></img>
                                    </div>
                                </TableCell>  
                                 <TableCell sx={{width:'200px'}}>
                                    <Button onClick={(e)=>editAchieves(row.id)} sx={{color:'blue'}}><EditTwoToneIcon/></Button>
                                    <Button onClick={(e)=>deleteAchieves(row.id)} sx={{color:'red'}}><DeleteTwoToneIcon/></Button>
                                </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> 
             
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={achieve.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> 
                                
        </Box>
    </div>
    );
}
export default Achievement;