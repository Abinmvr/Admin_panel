import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { useEffect,useState } from "react";
import { Box ,Button, TextField} from "@mui/material";
import { useParams,useHistory } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditJobs=()=>{
    const history = useHistory();
    const[position,setPosition]=useState('');
    const[details,setDetails]=useState('');
    const[location,setLocation]=useState('');
    const[expire,setExpire] = useState('');
    const[expirience,setExpirience] = useState('');
    const params = useParams();
    const id=params.id;
    const getJobs=()=>{
        axios.get(`${process.env.REACT_APP_ADMIN_PANEL_URL}getjobssbyid`,{params:{id:id}}).then((res)=>{
            const datas=res.data.message[0]
            setPosition(datas.position);
            setDetails(datas.description);
            setExpirience(datas.experience_in_years);
            setExpire(datas.expire_date);
            setLocation(datas.location);
        }).catch=(e)=>{ 
            console.log('err',e);
        }
    }
    useEffect(()=>getJobs(),[]);
    const updateJobs=()=>{
        if((position!=='')&&(details!=='')&&(location!=='')){
            axios.post(`${process.env.REACT_APP_ADMIN_PANEL_URL}editjobs`,{
                id:id,
                description:details,
                location:location,
                expire_date:expire.substring(0,10),
                experience_in_years:expirience
            }).then((res)=>{
                const status = res.data.success;
                if(status===true){
                        toast.success('Updated successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
                        history.push('/job');
                }
            }).catch=(e)=>{
                 console.log(e);
            }
        }
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
                <TextField margin="normal" type={'text'} variant={'outlined'} value={position} ></TextField>
                <TextField margin="normal" type={'text'} variant={'outlined'} value={location} onChange={(e)=>setLocation(e.target.value)}></TextField>
                <TextField margin="normal" type={'text'} variant={'outlined'} value={details} onChange={(e)=>setDetails(e.target.value)}></TextField>
                <TextField margin="normal" type={'text'} variant={'outlined'} value={expirience} onChange={(e)=>setExpirience(e.target.value)}></TextField>
                <TextField margin="normal" type={'text'} variant={'outlined'} value={expire.substring(0,10)} onChange={(e)=>setExpire(e.target.value)}></TextField>
                <Button  sx={{marginTop:2 }}variant="contained" color="warning" onClick={updateJobs}>update</Button> 
            </Box>
        </div>
    );
}
export default EditJobs;