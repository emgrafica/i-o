import PropTypes from 'prop-types';
import React from 'react';
import './pcAddress.scss';

const pcAddress = (props) => {
  const { listAddress } = props;
  return (
    <>{listAddress.length > 0 && <ul className="address-block">
      {listAddress.map((item, index) => {
        return (
          <li key={index}>
            <p className="ttl-add">{item.companyName}</p>
            <p className="info-add">
              <span>{item.firstName} {item.lastName}</span>
              <span>{item.street} {item.city}</span>
              <span>{item.state} {item.zipCode}</span>
              <span>{item.country}</span>
            </p>
          </li>
        )
      })
      }
    </ul>}</>
  );
};

pcAddress.propTypes = {
  listAddress: PropTypes.array
};

pcAddress.defaultProps = {
  listAddress: [
    {
      companyName: 'Office',
      firstName: 'Kierra',
      lastName: 'Henry',
      country: 'USA',
      street: '2901 S. 1st St.',
      city: 'Suite #100',
      state: 'Austin, TX',
      zipCode: '78704'
    },
    {
      companyName: 'Home',
      firstName: 'Kierra',
      lastName: 'Henry',
      country: 'USA',
      street: '2901 S. 1st St.',
      city: 'Suite #100',
      state: 'Austin, TX',
      zipCode: '78704'
    }
  ]
};

export default pcAddress;

