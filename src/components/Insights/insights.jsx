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
const Insights=()=>{
    const history =useHistory();
    const [insight,setInsight]=useState([])
    const getInsight=()=>{
        axios.get('http://localhost:3001/insight').then(res=>{
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
        axios.delete('http://localhost:3001/deleteinsights',{params:{id:id}}).then((res)=>{
            console.log(res.data.message);
            toast.success('Deleted successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
            getInsight();
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
                <Button onClick={updateInsights} sx={{color:'green'}}>Add<AddCircleOutlineTwoToneIcon/></Button>
                <TableContainer component={Paper}>
                    <Table sx={{ marginLeft:'240px',maxWidth:'650px' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title </TableCell>
                                <TableCell align="left">Details</TableCell>
                                <TableCell align="left">Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{insight.map((row,index) => (
                            <TableRow key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{row.title}</TableCell>
                                    <TableCell align="left">{row.details}</TableCell>
                                    <TableCell align="left" sx={{width:'50' }}>
                                        <div className="imagediv">
                                            <img src={row.image} alt={''} ></img>
                                        </div>
                                    </TableCell> 
                                    <TableCell align="right" ><Button onClick={(e)=>editInsights(row.id)} sx={{color:'blue',padding:0}}><EditRoundedIcon/></Button></TableCell>
                                    <TableCell align="right" ><Button onClick={(e)=>deleteInsights(row.id)} sx={{color:'red'}}><DeleteTwoToneIcon/></Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>      
            </Box>
        </div>
    )
}

  
export default Insights;