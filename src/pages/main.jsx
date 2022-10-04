import { BrowserRouter, BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Insights from "../components/Insights/insights";
import Achievement from "../components/Achievements/achievements";
import Login from "./Login";
import Home from "./home";
import AddAchieve from "../components/Achievements/addAchieves";
function MainPage(){
    return(
        <BrowserRouter>
            <Router>
                <Switch>  
                    <Route path='/home'><Home/></Route>
                    <Route  path='/achievements'><Achievement/> </Route>
                    <Route path='/add'><AddAchieve/></Route>
                    <Route  path='/insight'><Insights/></Route>
                    <Route exact path ='/'><Login/></Route>                  
                    <Route path='*'><h4>404 error - Page not found</h4></Route>
                </Switch>
            </Router>
        </BrowserRouter>
    );        
}
export default MainPage;