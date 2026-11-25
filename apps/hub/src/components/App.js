import Footer from './Footer/Footer';
import Loading from './Loading/Loading';
import React from 'react';

// application insight
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./AppInsights";
import { AUTH } from "./../constants";

import {SESSIONSTORAGEKEYS} from "../constants/storageConstants";
import { connect } from "react-redux";
import AppWithRouterAccess from './AppWithRouterAccess';

//class App extends React.Component {
const App = () =>{ 
    //Check for logged in user as the AuthProvider.getUserProfile is called every page load and may cause delay when checking by {this.props.isAuthenticated}
    const loggedIn = sessionStorage.getItem(SESSIONSTORAGEKEYS.LOGGED_IN);
    const auth = (loggedIn == "true");
    const settings = JSON.parse(localStorage.getItem(AUTH.SETTINGS));
    if(settings?.BROWSER_NAME){
      document.title = settings.BROWSER_NAME;
    }
    return (
      <AppInsightsContext.Provider value={reactPlugin}>
      <div>
        <Loading />
        {/* <button/> */}
        {/* <TopNav isAuthenticated={this.props.isAuthenticated}
          // authButtonMethod={this.props.isAuthenticated ? this.props.logout : this.props.login}
          user={this.props.user} /> */}
        {/* <div className="main-content">
          <BrowserRouter>
            <AppWithRouterAccess></AppWithRouterAccess>
          </BrowserRouter>
        </div> */}
        <AppWithRouterAccess/>
        {/* <Footer /> */}
      </div>
      </AppInsightsContext.Provider>
    );
  }
//}


// function PrivateRoute ({component: Component, authed, ...rest}) {
//   //consider for routing to welcome page
//   console.log('PrivateRoute - authed =', authed);
//   //console.log('PrivateRoute - component =', Component);
//   //console.log('PrivateRoute - rest =', JSON.stringify(rest));

//   return (
    
//     <Route
//       {...rest}
//       render={(props) => authed === true
//         ? <Component {...props}/>
//         : <Redirect to={{pathname: '/welcome', state: {from: props.location}}} />}
//     />
//   )
// }

//connect into Redux saga
const mapStateToProps = ({ isAuthenticated, user, error }) => ({
  isAuthenticated,
  user,
  error
});

const mapDispatchToProps = (dispatch) => ({
  
});

//export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default withAuthProvider(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);
