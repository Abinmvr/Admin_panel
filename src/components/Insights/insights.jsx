import axios from "axios";
import './insight.css';
import { useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import Paper from '@mui/material/Paper';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import { Table, Box, Button,TableRow,TableBody,TableCell,TableHead,TableContainer }from '@mui/material';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
const Insights=()=>{
    const history =useHistory();
    const [insight,setInsight]=useState([]);  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const getInsight=()=>{
        axios.get(`${process.env.REACT_APP_ADMIN_PANEL_URL}insight`).then(res=>{
            setInsight(res.data.message);
         }).catch=(e)=>{
            console.log(e);
        }
    }

    useEffect(()=>getInsight(),[]);

    const editInsights=(id)=>{
        history.push(`/editinsights/${id}`);
    }
    const updateInsights=()=>{
        history.push('/addinsight')
    }
    const deleteInsights=(id)=>{
        axios.delete(`${process.env.REACT_APP_ADMIN_PANEL_URL}deleteinsights`,{params:{id:id}}).then((res)=>{
            console.log(res.data.message);
            toast.warn('Deleted successfully !',{position:toast.POSITION.TOP_CENTER});
            getInsight();
        }).catch=(e)=>{
        console.log(e);
    }
    }
    const heading = ['Title','Details','Image','Actions'];
    return(
        <div>   
            <Box display={'flex'}
            flexDirection={"column"}
            marginLeft={260} 
            alignItems={'center'} 
            margin={'auto'}>  
                <Sidebar/>
                <Button onClick={updateInsights} sx={{color:'green'}}>Add<AddCircleOutlineTwoToneIcon/></Button>
                <TableContainer component={Paper}>
                    <Table sx={{ marginLeft:'240px',maxWidth:'800px' }} aria-label="simple table">
                        <TableHead>
                            <TableRow >{heading.map((head,key)=>(
                                <TableCell sx={{fontWeight:'bold',width:'200px'}} align="left" key={key}>{head}</TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>{insight.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
                            <TableRow key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{row.title}</TableCell>
                                    <TableCell align="left">{row.details}</TableCell>
                                    <TableCell align="left" sx={{width:'50' }}>
                                        <div className="imagediv">
                                            <img src={`http://localhost:3001/${row.image}`} alt={row.image} ></img>
                                        </div>
                                    </TableCell> 
                                    <TableCell sx={{width:'200px'}}>
                                        <Button onClick={(e)=>editInsights(row.id)} sx={{color:'blue',padding:0}}><EditRoundedIcon/>
                                        </Button><Button onClick={(e)=>deleteInsights(row.id)} sx={{color:'red'}}><DeleteTwoToneIcon/></Button>
                                    </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>  
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={insight.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> 
            </Box>
        </div>
    )
}

  
export default Insights;