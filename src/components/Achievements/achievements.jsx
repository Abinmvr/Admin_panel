import axios from "axios";
import './achieve.css';
import { useHistory } from "react-router-dom";
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
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
const Achievement=()=>{
    const history =useHistory();
    const [achieve,setAchieve]=useState([])
    const getAchieve=()=>{
        axios.get('http://localhost:3001/achieve').then((res)=>{
            setAchieve(res.data.message);
        }).catch=(e)=>{
            console.log(e);
        }
    }
    useEffect(()=>getAchieve(),[]);
    
    const editAchieves=(id)=>{
        console.log('edit',id);
    }
    const updateAchieves=(id)=>{
        console.log('update',id);
        history.push('/add');
    }
    const deleteAchieves=(id)=>{
        console.log('delete',id);
    }
   
    return(
        <div>   
        <Box display={'flex'}
        flexDirection={"column"}
        marginLeft={260} 
        alignItems={'center'} 
        margin={'auto'}
        >  
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
                                <TableCell align="right"><Button onClick={(e)=>updateAchieves(row.id)} sx={{color:'green'}}><AddCircleOutlineTwoToneIcon/></Button></TableCell>
                                <TableCell align="right"><Button onClick={(e)=>deleteAchieves(row.id)} sx={{color:'red'}}><DeleteTwoToneIcon/></Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>  
        </Box>
    </div>
    );
}
export default Achievement;