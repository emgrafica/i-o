import React from 'react';
import PropTypes from 'prop-types';
import './footer.scss';
import Grid from '@material-ui/core/Grid';
const Footer = (props) => {

  return (
    <div className="io-footer">      
      <Grid container className="io-footer-container">
      <Grid item xs={12} sm={6} md={6} className="io-footer-copyright">
        <span>
          {props.copyright}
        </span>
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="io-footer-link">
        <ul>
          {props.copyrightData.map((item, index) => (
            <li key={index}>
                <a href={item.path} target="blank">{item.title}</a>
            </li>
          ))}
        </ul>
      </Grid>
    </Grid>
    </div>
  );
};

Footer.propTypes = {
  /**
   * Title of Copyright
   */
  copyright: PropTypes.string,
  /**
   * Copyright Data
   */
   copyrightData: PropTypes.array
};

Footer.defaultProps = {
  copyright: "© DXC Technology Company",
  copyrightData: [
    {
      title: 'Legal',
      path: '/#',
    },
    {
      title: 'Privacy',
      path: '/#',
    },
    {
      title: 'Feedback',
      path: '/#',
    }
  ]
};


export default Footer;



