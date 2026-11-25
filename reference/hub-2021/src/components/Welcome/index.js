import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    authButtonMethod: PropTypes.func
}

function WelcomeContent(props) {
    // If authenticated, greet the user
  if (props.isAuthenticated) {
    return (
      <div>
        <h4>Welcome {props.user.first_name}!</h4>
        <p>You can show content here.</p>
      </div>
    );
  }

  // Not authenticated, present a sign in button
  return <Button color="primary" onClick={props.authButtonMethod}>Click here to sign in</Button>;
}

WelcomeContent.propTypes = propTypes;

export default WelcomeContent;
