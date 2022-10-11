import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { useEffect,useState } from "react";
import { Box ,Button, TextField, Typography} from "@mui/material";
import { useParams,useHistory } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditAchieve=()=>{
    const history = useHistory();
    const[title,setTitle]=useState('');
    const[details,setDetails]=useState('');
    const[imageLink,setImage]=useState('');
    const params = useParams();
    const id=params.id;
    const getAchieve=()=>{
        axios.get(`${process.env.REACT_APP_ADMIN_PANEL_URL}getachievebyid`,{params:{id:id}}).then((res)=>{
            const datas=res.data.message[0]
            setTitle(datas.title);
            setDetails(datas.details);
            setImage(datas.image);

        }).catch=(e)=>{ 
            console.log('err',e);
        }
    }
    useEffect(()=>getAchieve(),[]);
    const updateAchieve=()=>{
        if((title!=='')&&(details!=='')&&(imageLink!=='')){
            axios.post(`${process.env.REACT_APP_ADMIN_PANEL_URL}editachieve`,{
                id:id,
                title:title,
                details:details,
                image:imageLink 
            }).then((res)=>{
                const status = res.data.success;
                if(status===true){
                        toast.success('Updated successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
                        history.push('/achievements');
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
                <TextField margin="normal" type={'text'} variant={'outlined'} value={title} onChange={(e)=>setTitle(e.target.value)}></TextField>
                <TextField margin="normal" type={'text'} variant={'outlined'} value={details} onChange={(e)=>setDetails(e.target.value)}></TextField>
                <TextField margin="normal" type={'text'} variant={'outlined'} value={imageLink} onChange={(e)=>setImage(e.target.value)}></TextField>
                <Button  sx={{marginTop:2 }}variant="contained" color="warning" onClick={updateAchieve}>update</Button> 
            </Box>
        </div>
    );
}
export default EditAchieve;