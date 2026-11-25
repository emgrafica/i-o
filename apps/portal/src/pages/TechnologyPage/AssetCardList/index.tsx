import React from 'react';
import { useTechnologyActionsContext } from '..';
import { ActionTypes, AssetAction, ComputerAsset } from '../types';
import AssetCard from './AssetCard';
import { WideCard } from 'components/WideCard';
import { TechnologyAssets_myTechnologyAssets } from '../types/TechnologyAssets';
import { useTechnologyStateContext } from 'pages/TechnologyPage';

/**
 * Props for the AssetCardList component
 */
interface AssetCardListProps
  extends Omit<TechnologyAssets_myTechnologyAssets, '__typename'> {}

const AssetCardList: React.FC<AssetCardListProps> = ({ computers }) => {
  const dispatch = useTechnologyActionsContext();
  const { reassignedAssetIds, loadingAssetIds } = useTechnologyStateContext();

  const doHandle = (asset: ComputerAsset, action: AssetAction) => {
    dispatch({
      type: ActionTypes.SET_ASSET_DATA,
      payload: { assetData: asset, assetAction: action },
    });
  };

  const handleEditUsage = (asset: ComputerAsset) => {
    doHandle(asset, AssetAction.EditUsage);
  };

  const handleReassign = (asset: ComputerAsset) => {
    doHandle(asset, AssetAction.Reassign);
  };

  const handleReturn = (asset: ComputerAsset) => {
    doHandle(asset, AssetAction.Return);
  };

  const handleReportBroken = (asset: ComputerAsset) => {
    doHandle(asset, AssetAction.ReportBroken);
  };

  const handleReportOwnershipError = (asset: ComputerAsset) => {
    doHandle(asset, AssetAction.ReportOwnershipError);
  };

  const handleReplace = (asset: ComputerAsset) => {
    doHandle(asset, AssetAction.Replace);
  };

  // Connects handle wipe computer action to action switch case
  const handleWipeComputer = (asset: ComputerAsset) => {
    doHandle(asset, AssetAction.WipeComputer);
  };
  // Connects handle report missing computer action to action switch case
  const handleReportMissing = (asset: ComputerAsset) => {
    doHandle(asset, AssetAction.ReportMissing);
  };
  const handleRegisterOwnership = (asset: ComputerAsset) => {
    doHandle(asset, AssetAction.RegisterOwnership);
  };

  return computers ? (
    <WideCard.List>
      {computers.map((computer, index) => (
        <AssetCard
          key={computer.id}
          data={computer}
          onReassign={handleReassign}
          onReturn={handleReturn}
          onReportBroken={handleReportBroken}
          onReplace={handleReplace}
          onEditUsage={handleEditUsage}
          onReportMissing={handleReportMissing}
          onRegisterOwnership={handleRegisterOwnership}
          onReportOwnershipError={handleReportOwnershipError}
          onWipeComputer={handleWipeComputer}
          isReassigned={reassignedAssetIds.includes(computer.id)}
          isAssetLoading={loadingAssetIds.has(computer.id)}
          isLastCard={index === computers.length - 1}
        />
      ))}
    </WideCard.List>
  ) : null;
};

export default AssetCardList;
