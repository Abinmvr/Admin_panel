import axios from "axios";
import './insight.css';
import { useState,useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import Table from '@mui/material/Table';
import { Box, Button } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
const Insights=()=>{
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
        console.log('edit',id);
    }
    const updateInsights=(id)=>{
        console.log('update',id);
    }
    const deleteInsights=(id)=>{
        console.log('delete',id);
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
                                    <TableCell align="right" ><Button onClick={(e)=>updateInsights(row.id)} sx={{color:'green'}}><AddCircleOutlineTwoToneIcon/></Button></TableCell>
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