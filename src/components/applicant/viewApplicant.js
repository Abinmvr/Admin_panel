import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { useEffect,useState } from "react";
import { Box } from "@mui/material";
import { useParams,useHistory } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ViewApplicant=()=>{
    const history=useHistory();
    const[result,setResult]=useState([]);
    const params = useParams();
    const id=params.id;
    const getApplicant=()=>{
        axios.get(`${process.env.REACT_APP_ADMIN_PANEL_URL}getapplicantbyid`,{params:{id:id}}).then((res)=>{
            const datas=res.data.message[0]
            setResult(datas);
        }).catch=(e)=>{ 
            console.log('err',e);
        }
    }
    useEffect(()=> getApplicant(),[]);
    const backFunction=()=>{
        history.push('/applicant');
    }
    return(
        <div>
            <Box display={'flex'}
                flexDirection={"column"}
                marginLeft={260} width={'600px'}
                padding={'0px 10px'}
                margin={'auto'} 
                justifyContent={'center'}>
                <Sidebar/>  
                <Card sx={{ maxWidth: 700}}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Applicant details
                        </Typography>
                        <p><b>Name : </b>{result.first_name}</p>
                        <p><b>Email : </b>{result.email}</p>
                        <p><b>Experience : </b>{result.experience_in_years} year</p>
                        <p><b>Resume : </b><a target="_blank" rel="noreferrer" href={`http://localhost:3001/${result.resume}`}>{result.resume}</a></p>
                    </CardContent>
                    <CardActions>
                        <Button sx={ {color:'red'}}size="small" onClick={backFunction}>Back</Button>
                    </CardActions>
                </Card>
            </Box>
            
        </div>
    );
}
export default ViewApplicant;