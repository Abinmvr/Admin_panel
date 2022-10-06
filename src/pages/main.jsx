import { BrowserRouter, BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Insights from "../components/Insights/insights";
import Achievement from "../components/Achievements/achievements";
import Login from "./Login";
import Home from "./home";
import AddAchieve from "../components/Achievements/addAchieves";
import EditAchieve from "../components/Achievements/editAchieves";
import AddInsights from "../components/Insights/addInsights";
import EditInsights from "../components/Insights/editInsights";
function MainPage(){
    return(
        <BrowserRouter>
            <Router>
                <Switch>  
                    <Route path='/home'><Home/></Route>
                    <Route  path='/achievements'><Achievement/> </Route>
                    <Route path='/editachieve/:id'><EditAchieve/></Route>
                    <Route exact path ='/addachieve'><AddAchieve/></Route>
                    <Route  path='/insight'><Insights/></Route>
                    <Route  path='/addinsight'><AddInsights/></Route>
                    <Route path='/editinsights/:id'><EditInsights/></Route>
                    <Route exact path ='/'><Login/></Route>                  
                    <Route path='*'><h4>404 error - Page not found</h4></Route>
                </Switch>
            </Router>
        </BrowserRouter>
    );        
}
export default MainPage;