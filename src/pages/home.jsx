import Sidebar from "../components/sidebar/sidebar";
import { Box } from "@mui/material";
import * as React from 'react';
const Home=()=>{
    return(
        <div>
            <Box display={'flex'} flexDirection={"column"}
                 marginLeft={260} alignItems={'center'} justifyContent={'center'}
                 margin={'auto'} marginTop={5} padding={3} borderRadius={3}
                 boxShadow={'5px 5px 10px #ccc'}>  
                <Sidebar/>
                <h2>Home</h2> 
                
            </Box>
        </div>
   
    )
}
export default Home;




