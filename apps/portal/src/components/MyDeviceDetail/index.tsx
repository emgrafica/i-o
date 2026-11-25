// @ts-nocheck
import { SideSheet } from '@lumos/core';
import { IoMydevicesDetail, IoLoadingWithBackdrop } from '@i-o/design-system';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AssignmentIssue,
  PcLostAndStolenPath,
  PcRefresh,
  PcReturnPath,
  PcReportBroken,
} from 'utils/routes';
import AcknowledgeDialog from 'components/AcknowledgeDialog';
import pcProcessingWorkFlow from 'services/pcProcessingWorkFlow';
import { WorkFlowType } from 'utils/dynamicForm';
import UserService from 'services/userServices';
import DeviceServices from 'services/devicesServices';
import { HomePath } from 'utils/routes';

interface MyDeviceDetailProps {
  isOpen: boolean;
  setIsOpen: Function;
  itemDetail: any;
}

const MyDeviceDetail: React.FC<MyDeviceDetailProps> = ({
  isOpen,
  setIsOpen,
  itemDetail,
  handleReloadDevice,
}) => {
  const history = useHistory();
  const [deviceDetail, setDeviceDetail] = useState(itemDetail);
  const [openAcknowledgeDialog, setOpenAcknowledgeDialog] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [isChangingDevice, setIsChangingDevice] = useState(false);
  const userData = UserService.getCurrentUser();

  useEffect(() => {
    if (!!itemDetail) {
      setDeviceDetail(itemDetail);
      setIsChangingDevice(false);
    }
  }, [itemDetail]);
  
  const onSideSheetClose = () => {
    if(!openLoading){
      setIsOpen(false);
    }
    if (!!isChangingDevice) {
      handleReloadDevice();
    }
  };
  
  const reloadActionsList = async () => {
    let result = await DeviceServices.getPCResfreshStatus(userData.user_name);
    if (result) {
      setDeviceDetail(result.find(device => device.uid === deviceDetail.uid) || deviceDetail);
    }
  };

  const HandleClickAcknowledge = async () => {
    const params = {
      request_type: WorkFlowType.PC_ACKNOWLEDGE_DEVICE,
      user_sys_id: userData.uid,
      device_sys_id: itemDetail.uid,
      user_email: userData.email,
    };
    const canRegisterOwnership = itemDetail.actions.canRegisterOwnership;
    if (params && canRegisterOwnership) {
      setOpenLoading(true);
      const response = await pcProcessingWorkFlow.PcProcessing(params);
      if(response){
        setOpenLoading(false);
        reloadActionsList();
        setIsChangingDevice(true);
        setOpenAcknowledgeDialog(true);
      } else {
        setOpenLoading(false)
      }     
    } else {
      setOpenAcknowledgeDialog(false);
    }
  };

  const HandleFinish = () => {
    history.push({ pathname: HomePath });
    setOpenAcknowledgeDialog(false);
  };

  const onClickAction = actionKey => {
    switch (actionKey) {
      case 'canRefresh':
        history.push(`${PcRefresh}/${itemDetail.uid}`);
        break;
      case 'canReportOwnershipError':
        history.push(`${AssignmentIssue}/${itemDetail.uid}`);
        break;
      case 'canReturn':
        history.push(`${PcReturnPath}/${itemDetail.uid}`);
        break;
      case 'canReportMissing':
        history.push(`${PcLostAndStolenPath}/${itemDetail.uid}`);
        break;
      case 'canReportBroken':
        history.push(`${PcReportBroken}/${itemDetail.uid}`);
        break;
      case 'canRegisterOwnership':
        HandleClickAcknowledge();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SideSheet
        id="mydevice-detail"
        padding={0}
        isOpen={isOpen}
        onRequestClose={onSideSheetClose}
      >
        <IoMydevicesDetail
          itemDetail={deviceDetail || itemDetail}
          onClickAction={onClickAction}
          isShowSpecifications={false}
          isShowDescription={false}
          isCopySerialNumber={false}
        />
      {openLoading? (
        <IoLoadingWithBackdrop isOpen={openLoading}/>
      ) : (
        <AcknowledgeDialog
        open={openAcknowledgeDialog}
        handleClose={() => setOpenAcknowledgeDialog(false)}
        handleFinish={() => HandleFinish()}
        />
      )}
      </SideSheet>


    </>
  );
};

export default MyDeviceDetail;
