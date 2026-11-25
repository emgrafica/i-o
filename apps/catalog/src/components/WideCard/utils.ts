import { Placement } from '@lumos/core/lib/components/Popover/Popover.style';
import { Device } from 'utils/useDevice';

export default function getPopoverPlacement(
  device: Device,
  isLastCard: boolean,
) {
  let popoverPlacement: Placement = 'bottom';
  if (device === Device.Tablet) popoverPlacement = 'left';
  else if (isLastCard) popoverPlacement = 'top';
  return popoverPlacement;
}
