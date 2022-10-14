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
    const[error,setError]=useState('');
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
        const formData = new FormData();
        if((title!=='')&&(details!=='')){
            // &&(imageLink!=='')
            formData.append('id',id);
            formData.append('title',title);
            formData.append('details',details);
            formData.append('image',imageLink );
            axios.post(`${process.env.REACT_APP_ADMIN_PANEL_URL}editachieve`,formData,
            {headers:{
                'content-type':'multipart/form-data'
            }
            }).then((res)=>{
                const status = res.data.success;
                if(status===true){
                        toast.success('Updated successfully !',{position:toast.POSITION.TOP_CENTER});
                        history.push('/achievements');
                }
                else{
                        setError(res.data.message)
                }
            }).catch=(e)=>{
                 console.log(e);
            }
        }
    }
    const imageChange=(event)=>setImage(event.target.files[0]);

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
                <TextField margin="normal" type={'file'} variant={'outlined'}  onChange={imageChange}></TextField>
                <div className="error_div">{error}</div>
                <Button  sx={{marginTop:2 }}variant="contained" color="warning" onClick={updateAchieve}>update</Button> 
            </Box>
        </div>
    );
}
export default EditAchieve;