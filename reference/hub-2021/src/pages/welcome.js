import React from 'react'
import WelcomeContent from '../components/Welcome'
import '../styles/scss/welcome/welcome.scss'

// function welcomePage(props) {
//     return (
//         <div>
//             <Jumbotron>
//                 <h1>Welcome Page</h1>
//                 <p className="lead">
//                     Content to show up the example how to login with azure active directory.
//                 </p>
//                 <WelcomeContent
//                     isAuthenticated={this.props.isAuthenticated}
//                     user={this.props.user}
//                     authButtonMethod={this.props.authButtonMethod} />
//             </Jumbotron>
//         </div>
//     )
// }

const welcomePage = () => (
    <div className="welcome-content">
        <div className="welcome-content-title">Welcome to i-o Portal!</div>
        <div className="welcome-content-subtitle">This is default page for unauthenticated users.</div>
    </div>
  );

export default welcomePage;
