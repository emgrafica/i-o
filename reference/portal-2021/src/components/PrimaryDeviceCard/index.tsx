// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { IoCard } from '@i-o/design-system';
import { useHistory } from 'react-router-dom';
import { ManagePersonalTechnologyPath } from 'utils/routes';
import pcProcessingWorkFlow from 'services/pcProcessingWorkFlow';
import { WorkFlowType } from 'utils/dynamicForm';
import UserService from 'services/userServices';
import { HomePath } from 'utils/routes';
import AcknowledgeDialog from 'components/AcknowledgeDialog';
import MyDeviceDetail from 'components/MyDeviceDetail';

const PrimaryDeviceCard = (props: any) => {
  const { deviceItem, handleReloadDevice } = props;
  const [primaryDevice, setPrimaryDevice] = useState({ deviceItem });
  const [isLoading, setIsLoading] = useState(false);
  const [openAcknowledgeDialog, setOpenAcknowledgeDialog] = useState(false);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (deviceItem && deviceItem.uid) {
      setPrimaryDevice(deviceItem);
      setIsLoading(true);
    }
  }, [deviceItem]);

  const viewDetailHandler = () => {
    setIsOpen(true);
  };

  const HandleAcknowledge = async () => {
    const userData = UserService.getCurrentUser();
    const params = {
      request_type: WorkFlowType.PC_ACKNOWLEDGE_DEVICE,
      user_sys_id: userData.uid,
      device_sys_id: primaryDevice.uid,
      user_email: userData.email,
    };
    const canRegisterOwnership =
      primaryDevice?.primaryDeviceDetail.actions.canRegisterOwnership;
    if (params && !!canRegisterOwnership) {
      const response = await pcProcessingWorkFlow.PcProcessing(params);
      if (!!response.data) {
        setOpenAcknowledgeDialog(true);
      }
    } else {
      setOpenAcknowledgeDialog(false);
    }
  };

  const HandleFinish = () => {
    history.push({ pathname: HomePath });
    setOpenAcknowledgeDialog(false);
  };

  if (isLoading) {
    return (
      <>
        <MyDeviceDetail
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          itemDetail={primaryDevice}
          handleReloadDevice={handleReloadDevice}
        />
        <IoCard.PCCard
          primaryDevice={primaryDevice}
          handleMoreActions={() => viewDetailHandler()}
          handleAcknowledge={() => HandleAcknowledge()}
          handleReportIssue={() => {}}
        />
        <AcknowledgeDialog
          open={openAcknowledgeDialog}
          handleClose={() => setOpenAcknowledgeDialog(false)}
          handleFinish={() => HandleFinish()}
        />
      </>
    );
  } else {
    return <div />;
  }
};

export default PrimaryDeviceCard;
