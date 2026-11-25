// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Radio, ImageList, ImageListItem } from '@material-ui/core';
import { IoMydevicesDetail } from '@i-o/design-system';
import PrimaryDeviceItemCard from './PrimaryDeviceItemCard';
import { IoCard } from '@i-o/design-system';
import styled from 'styled-components';
import useDevice, { Device } from 'utils/useDevice';

const Wrapper = styled.div`
  text-align: center;
  .io-device-primary {
    border: none;
    box-shadow: none;
  }
`;
const WrapperBox = styled.div`
}`;

const ImageListCustom = styled(ImageList)`
  transform: translateZ(0);
  box-shadow: 0 1px 2px 2px rgb(0 0 0 / 10%), 0 2px 3px 0 rgb(0 0 0 / 20%);
  flex-wrap: inherit !important;
  margin: 30px 0;
}`;

const ImageListItemCustom = styled(ImageListItem)`
  height: 100% !important;
  padding: 5px !important;
}`;

export interface SelectDeviceComponent {
  data;
}

const SelectDeviceComponent: React.FC<SelectDeviceComponent> = ({
  data,
  value,
  onChange,
  // error
}) => {
  const [selectedDevice, setSelectedDevice] = useState(
    value ? value : data && data.length > 0 ? data[0] : null,
  );
  const device = useDevice();
  const isMobile = device === Device.Mobile;
  useEffect(() => {
    if (!value && data) {
      onChange(data[0]);
    }
  }, [data]);
  return (
    <div>
      {selectedDevice && (
        <WrapperBox>
          <IoMydevicesDetail
            itemDetail={{
              configuration: {},
              ...selectedDevice,
              actions: {},
            }}
            listLink={[]}
            horizontal={true}
            isShowDetailDevice={false}
            isShowSpecifications={false}
            isLableRefresh={false}
            isCopySerialNumber={false}
          />
        </WrapperBox>
      )}
      {data && (
        <ImageListCustom cols={isMobile ? 1.2 : 2.5}>
          {data.map(item => {
            return (
              <ImageListItemCustom
                onClick={() => {
                  setSelectedDevice(item);
                  onChange(item);
                }}
                key={item.uid}
              >
                <Wrapper>
                  <PrimaryDeviceItemCard
                    data={item}
                    horizontal={false}
                    isShowAction={false}
                  />
                  <Radio
                    color="primary"
                    checked={selectedDevice.uid === item.uid}
                  />
                </Wrapper>
              </ImageListItemCustom>
            );
          })}
        </ImageListCustom>
      )}
      {!selectedDevice && (
        <IoCard.EmptyCard contentDescription="We're sorry, we don't have any devices that match your current device." />
      )}
    </div>
  );
};

export default SelectDeviceComponent;
