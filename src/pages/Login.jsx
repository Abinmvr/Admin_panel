import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState} from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
const Login =()=>{
    const history =useHistory();
    const[user,setUser] = useState('');
    const[password,setPassword]= useState('');
    const[error,setError]=useState('');
    const loginFunction=()=>{
        if((user!=='')&&(password!=='')){
            axios.post('http://localhost:3001/login',{
            username:user,
            password:password
            }).then((response)=>{
                const status = response.data.success;
                if(status===true){ 
                    sessionStorage.setItem('username','user');
                    history.push('/home');   
                }
                else{
                    const errtype = response.data.message;
                    setError(errtype);
                }
        });
        }
        else{
            setError('*Please enter your details');
        }
    }

    return(
        <div>
        <Box display={'flex'}
             flexDirection={"column"}
             maxWidth={350}  alignItems={'center'} justifyContent={'center'}
             margin={'auto'}
             marginTop={5}
             padding={3}
             borderRadius={3}
             boxShadow={'5px 5px 10px #ccc'}
             >
                <Typography variant='h3' padding={3} textAlign={'center'}>Login</Typography>
                <TextField margin="normal" type={'text'} variant={'outlined'} placeholder={'name'}
                 onChange={(e)=>setUser(e.target.value)}></TextField>
                <TextField onChange={(e)=>setPassword(e.target.value)} margin="normal" type={'password'} variant={'outlined'} placeholder={'password'}></TextField>
                <Button onClick={loginFunction} sx={{marginTop:2 }}variant="contained" color="warning">Login</Button>
                <div>{error}</div>
        </Box>

        </div>
    )
}
export default Login