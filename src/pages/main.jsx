import { BrowserRouter, BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Insights from "../components/Insights/insights";
import Achievement from "../components/Achievements/achievements";
import Login from "./Login";
import Home from "./home";
import AddAchieve from "../components/Achievements/addAchieves";
import EditAchieve from "../components/Achievements/editAchieves";
import AddInsights from "../components/Insights/addInsights";
import EditInsights from "../components/Insights/editInsights";
import Jobs from "../components/jobs/job";
import EditJobs from "../components/jobs/editJobs";
import AddJobs from "../components/jobs/addjobs";
import Applicant from "../components/applicant/applicant";
import ViewApplicant from "../components/applicant/viewApplicant";
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
                    <Route exact path='/addinsight'><AddInsights/></Route>
                    <Route path='/editinsights/:id'><EditInsights/></Route>
                    <Route  path='/job'><Jobs/></Route>
                    <Route path='/addjobs'><AddJobs/></Route>
                    <Route path='/editjobs/:id'><EditJobs/></Route>
                    <Route  path='/applicant'><Applicant/></Route>
                    <Route path='/viewapplicant/:id'><ViewApplicant/> </Route>
                    <Route exact path ='/'><Login/></Route>                  
                    <Route path='*'><h4>404 error - Page not found</h4></Route>
                </Switch>
            </Router>
        </BrowserRouter>
    );        
}
export default MainPage;