import React, { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import styled from 'styled-components';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

const StyledOktaWidget = styled.div`
  #okta-sign-in.auth-container .button-primary {
    background-color: #6f2c91 !important;
    background: linear-gradient(#6f2c91, #6f2c91) !important;
  }
`;

const OktaSignInWidget = ({ config, onSuccess, onError }: any) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  useEffect((): any => {
    if (!widgetRef.current) return false;

    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, []);

  return <StyledOktaWidget ref={widgetRef} />;
};
export default OktaSignInWidget;
