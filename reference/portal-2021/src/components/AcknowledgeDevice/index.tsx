// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { IoCard } from '@i-o/design-system';
import { useHistory } from 'react-router-dom';
import pcProcessingWorkFlow from 'services/pcProcessingWorkFlow';
import { WorkFlowType } from 'utils/dynamicForm';
import UserService from 'services/userServices';
import { HomePath } from 'utils/routes';
import AcknowledgeDialog from 'components/AcknowledgeDialog';

const AcknowledgeDeviceCard = (props: any) => {
  const { deviceItem, handleOpenLoadingAcknowledge, handleReloadDevice } = props;
  const [acknowledgeDevice, setAcknowledgeDevice] = useState({ deviceItem });
  const [isLoading, setIsLoading] = useState(false);
  const [openAcknowledgeDialog, setOpenAcknowledgeDialog] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (deviceItem && deviceItem.uid) {
      setAcknowledgeDevice(deviceItem);
      setIsLoading(true);
    }
  }, [deviceItem]);

  const HandleAcknowledgeDevice = async () => {
    const userData = UserService.getCurrentUser();
    const params = {
      request_type: WorkFlowType.PC_ACKNOWLEDGE_DEVICE,
      user_sys_id: userData.uid,
      device_sys_id: acknowledgeDevice.uid,
      user_email: userData.email,
    };
    const canRegisterOwnership = acknowledgeDevice.actions.canRegisterOwnership;
    if (params && canRegisterOwnership) {
      handleOpenLoadingAcknowledge(true);
      const response = await pcProcessingWorkFlow.PcProcessing(params);
      if(response){
        handleOpenLoadingAcknowledge(false);
        setOpenAcknowledgeDialog(true);
      } else {
        handleOpenLoadingAcknowledge(false);
      }     
    } else {
      setOpenAcknowledgeDialog(false);
    }
  };

  const HandleFinish = () => {
    handleReloadDevice();
    history.push({ pathname: HomePath });
    setOpenAcknowledgeDialog(false);
  };

  const handleClose = () => {
    handleReloadDevice();
    setOpenAcknowledgeDialog(false);
  }

  if (isLoading) {
    return (
      <>
        <IoCard.AcknowledgeCard
          acknowledgeDevice={acknowledgeDevice}
          handleAcknowledge={() => HandleAcknowledgeDevice()}
        />
          <AcknowledgeDialog
          open={openAcknowledgeDialog}
          handleClose={() => handleClose()}
          handleFinish={() => HandleFinish()}
          />
      </>
    );
  } else {
    return <div />;
  }
};

export default AcknowledgeDeviceCard;
