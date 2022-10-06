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

const Achievement=()=>{
    const history =useHistory();
    const [achieve,setAchieve]=useState([])
    const getAchieve=()=>{
        axios.get('http://localhost:3001/achieve').then((res)=>{
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
        axios.delete('http://localhost:3001/deleteachieve',{params:{id:id}}).then((res)=>{
            toast.success('Deleted successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
            getAchieve();
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
                <Table sx={{ marginLeft:'240px',maxWidth:'600px' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title </TableCell>
                            <TableCell align="left">Details</TableCell>
                            <TableCell align="left">Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{achieve.map((row,index) => (
                        <TableRow key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{row.title}</TableCell>
                                <TableCell align="left">{row.details}</TableCell>
                                <TableCell align="left" sx={{width:'50' }}>
                                    <div className="imagediv">
                                        <img src={row.image} alt={'achieve'} ></img>
                                    </div>
                                </TableCell> 
                                <TableCell align="right"><Button onClick={(e)=>editAchieves(row.id)} sx={{color:'blue'}}><EditTwoToneIcon/></Button></TableCell>
                                <TableCell align="right"><Button onClick={(e)=>deleteAchieves(row.id)} sx={{color:'red'}}><DeleteTwoToneIcon/></Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> 
            <Button onClick={updateAchieves} sx={{color:'green'}}>Add<AddCircleOutlineTwoToneIcon/></Button>
                                
        </Box>
    </div>
    );
}
export default Achievement;