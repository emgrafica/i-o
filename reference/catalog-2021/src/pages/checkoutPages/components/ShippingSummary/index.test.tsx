import React from 'react';
import { renderWithRouter } from 'tests/utils';
import ShippingSummary from '.';

describe('ShippingSummary', () => {
  // fake data props
  const shippingSummaryProps = {
    shippingInfo: {
      name: 'John Doe',
      company: 'Company',
      address1: '123 Fake Street',
      address2: 'Suite 300',
      phone: '1234567890',
      city: 'Miami',
      state: 'FL',
      zip: '12345',
      country: 'USA',
      additionalDeliveryInfo: 'Leave at door',
    },
  };

  it('should display the Name property passed in from the requestData props', () => {
    const { getByText } = renderWithRouter({
      ui: <ShippingSummary {...shippingSummaryProps.shippingInfo} />,
    });

    const textArea = getByText(shippingSummaryProps.shippingInfo.name);

    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveTextContent(shippingSummaryProps.shippingInfo.name);
  });
  it('should display the Company property passed in from the requestData props', () => {
    const { getByText } = renderWithRouter({
      ui: <ShippingSummary {...shippingSummaryProps.shippingInfo} />,
    });

    const textArea = getByText(shippingSummaryProps.shippingInfo.company);

    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveTextContent(
      shippingSummaryProps.shippingInfo.company,
    );
  });
  it('should display the Phone property passed in from the requestData props', () => {
    const { getByText } = renderWithRouter({
      ui: <ShippingSummary {...shippingSummaryProps.shippingInfo} />,
    });

    const textArea = getByText(shippingSummaryProps.shippingInfo.phone);

    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveTextContent(shippingSummaryProps.shippingInfo.phone);
  });
  it('should display the additionalDeliveryInfo property passed in from the requestData props', () => {
    const { getByText } = renderWithRouter({
      ui: <ShippingSummary {...shippingSummaryProps.shippingInfo} />,
    });

    const textArea = getByText(
      shippingSummaryProps.shippingInfo.additionalDeliveryInfo,
    );

    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveTextContent(
      shippingSummaryProps.shippingInfo.additionalDeliveryInfo,
    );
  });
  it('should display the Address 1 property passed in from the requestData props', () => {
    const { getByText } = renderWithRouter({
      ui: <ShippingSummary {...shippingSummaryProps.shippingInfo} />,
    });

    const textArea = getByText(shippingSummaryProps.shippingInfo.address1);

    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveTextContent(
      shippingSummaryProps.shippingInfo.address1,
    );
  });
  it('should display the Address 2 property passed in from the requestData props', () => {
    const { getByText } = renderWithRouter({
      ui: <ShippingSummary {...shippingSummaryProps.shippingInfo} />,
    });

    const textArea = getByText(shippingSummaryProps.shippingInfo.address2);

    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveTextContent(
      shippingSummaryProps.shippingInfo.address2,
    );
  });
  it.only('should display the City, State and Zip Code properties passed in from the requestData props', () => {
    const { getByText } = renderWithRouter({
      ui: <ShippingSummary {...shippingSummaryProps.shippingInfo} />,
    });

    const city = getByText(`${shippingSummaryProps.shippingInfo.city}`);
    const state = getByText(`${shippingSummaryProps.shippingInfo.state}`);
    const zip = getByText(`${shippingSummaryProps.shippingInfo.zip}`);

    expect(city).toBeInTheDocument();
    expect(state).toBeInTheDocument();
    expect(zip).toBeInTheDocument();
    expect(city).toHaveTextContent(`${shippingSummaryProps.shippingInfo.city}`);
    expect(state).toHaveTextContent(
      `${shippingSummaryProps.shippingInfo.state}`,
    );
    expect(zip).toHaveTextContent(`${shippingSummaryProps.shippingInfo.zip}`);
  });
  it('should display the Country property passed in from the requestData props', () => {
    const { getByText } = renderWithRouter({
      ui: <ShippingSummary {...shippingSummaryProps.shippingInfo} />,
    });

    const textArea = getByText(shippingSummaryProps.shippingInfo.country);

    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveTextContent(
      shippingSummaryProps.shippingInfo.country,
    );
  });
});
