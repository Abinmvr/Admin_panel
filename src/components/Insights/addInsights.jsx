import './insight.css';
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import {useState } from "react";
import { Box ,Button, TextField} from "@mui/material";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
const AddInsights=()=>{
    const history=useHistory();
    const[title,setTitle]=useState('');
    const[details,setDetails]=useState('');
    const[imageLink,setImage]=useState('');
    const[error,setError]=useState('');
    const addInsightsFunction=()=>{
        const formData = new FormData();
        if((title!=='')&&(details!=='')&&(imageLink!=='')){
            formData.append('title',title);
            formData.append('details',details);
            formData.append('image',imageLink );
            axios.post(`${process.env.REACT_APP_ADMIN_PANEL_URL}addInsights`,formData,
            {headers:{
                'content-type':'multipart/form-data'
            }
            }).then((res)=>{
                const status = res.data.success;
                if(status===true){
                        setError('');
                        toast.success('Add successfully !',{position:toast.POSITION.TOP_CENTER});
                        history.push('/Insight');
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
                <TextField margin="normal" type={'text'} variant={'outlined'} placeholder={'title'} onChange={(e)=>setTitle(e.target.value)} ></TextField>
                <TextField margin="normal" type={'text'} variant={'outlined'} placeholder={'Description'} onChange={(e)=>setDetails(e.target.value)} ></TextField>
                <TextField margin="normal" type={'file'} variant={'outlined'} placeholder={'Image Link'} onChange={imageChange}></TextField>
                <div className="error_div">{error}</div>
                <Button  sx={{marginTop:2 }}variant="contained" color="success" onClick={addInsightsFunction}>Add</Button> 
            </Box>
        </div>
    );
}
export default AddInsights;