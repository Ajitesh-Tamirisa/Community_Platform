import './App.css';
import DiscussionForum from './DiscussionForum';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AuthProvider} from "./contexts/AuthContext"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import QuestionsPage from "./components/QuestionPage/QuestionPage"
import Opportunities from "./components/Opportunities/Opportunities"
import OppsPage from "./components/OpportunitiesPage/OppsPage"
import Announcements from "./components/Announcements/Announcements"
import Users from "./components/Users/Users"
import AdminSignin from "./components/Signin/AdminSignin"
import AdminRoute from "./components/PrivateRoute/AdminRoute"
import Home from "./components/Home/Home"

function App() {
  return (
    <div className="App">
      <Router>        
        <AuthProvider>
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/Announcements" exact component={Announcements} />
            <Route path="/Signup" render={(props)=> (<Signup {...props} userType={1}/>)} />
            <Route path="/Signin" component={Signin} />
            <PrivateRoute path="/DiscussionForums/:branchId/:questionId" component={QuestionsPage} />
            <PrivateRoute path="/DiscussionForums/:branchId" component={DiscussionForum} />
            <PrivateRoute path="/Opportunities/:oppId" component={OppsPage} />
            <PrivateRoute path="/Opportunities" component={Opportunities} />
            <Route path="/Admin/Signin" component={AdminSignin} />
            <AdminRoute path="/Admin/Users" component={Users} />  
            <AdminRoute path="/Admin/AddFaculty" component={Signup} />
          </Switch>        
        </AuthProvider>
      </Router>
    </div>
  );
}
// const Home = ()=>(
//   <div><h1>Home</h1></div>    
// )

export default App;
