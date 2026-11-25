import { Device } from 'utils/useDevice';

export class ValueByDevice {
  constructor(
    /**
     * defaultValue will be returned for any layout that does not have a value set
     */
    public defaultValue: any,
    /**
     * Represents the value for Desktop layouts
     */
    public desktopValue: any = null,
    /**
     * Represents the value for Tablet layouts
     */
    public tabletValue: any = null,

    /**
     * Represent value for Mobile layouts
     */
    public mobileValue: any = null,
  ) {}

  getValue(device: Device) {
    switch (device) {
      case Device.Desktop:
        return this.desktopValue ? this.desktopValue : this.defaultValue;

      case Device.Tablet:
        return this.tabletValue ? this.tabletValue : this.defaultValue;

      case Device.Mobile:
        return this.mobileValue ? this.mobileValue : this.defaultValue;

      default:
        return this.defaultValue;
    }
  }
}
