import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { useEffect,useState } from "react";
import { Box ,Button, TextField} from "@mui/material";
import { useParams,useHistory } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditInsights=()=>{
    const history = useHistory();
    const[title,setTitle]=useState('');
    const[details,setDetails]=useState('');
    const[imageLink,setImage]=useState('');
    const params = useParams();
    const id=params.id;
    const getInsights=()=>{
        axios.get('http://localhost:3001/getinsightsbyid',{params:{id:id}}).then((res)=>{
            const datas=res.data.message[0]
            setTitle(datas.title);
            setDetails(datas.details);
            setImage(datas.image);

        }).catch=(e)=>{ 
            console.log('err',e);
        }
    }
    useEffect(()=>getInsights(),[]);
    const updateInsights=()=>{
        if((title!=='')&&(details!=='')&&(imageLink!=='')){
            axios.post('http://localhost:3001/editinsights',{
                id:id,
                title:title,
                details:details,
                image:imageLink 
            }).then((res)=>{
                const status = res.data.success;
                if(status===true){
                        toast.success('Updated successfully !',{position:toast.POSITION.TOP_CENTER,autoClose:false});
                        history.push('/insight');
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
                <Button  sx={{marginTop:2 }}variant="contained" color="warning" onClick={updateInsights}>update</Button> 
            </Box>
        </div>
    );
}
export default EditInsights;