import { TFunction } from 'i18next';
import BusinessApplication from 'assets/images/topCategories/BusinessApplication.svg';
import ChatAndMeetingTools from 'assets/images/topCategories/ChatAndMeetingTools.svg';
import Email from 'assets/images/topCategories/Email.svg';
import FileSharingAndStorage from 'assets/images/topCategories/FileSharingAndStorage.svg';
import LaptopsAndDesktops from 'assets/images/topCategories/LaptopsAndDesktops.svg';
import MobileAndPhone from 'assets/images/topCategories/MobileAndPhone.svg';
import PasswordAndId from 'assets/images/topCategories/PasswordAndId.svg';
import RemoteAccessAndNetwork from 'assets/images/topCategories/RemoteAccessAndNetwork.svg';

export const getCategories = (t: TFunction) => {
  return [
    {
      icon: BusinessApplication,
      label: t('middleSection.businessAppLabel'),
      subcategories: [
        'middleSection.teamcenterLabel',
        'middleSection.powermaxLabel',
        'middleSection.racesLabel',
        'middleSection.plmLabel',
        'middleSection.tableauLabel',
        'middleSection.sapLabel',
        'middleSection.oracleLabel',
      ],
    },
    {
      icon: PasswordAndId,
      label: t('middleSection.secretKeyLabel'),
      subcategories: [
        'middleSection.secretKeyResetLabel',
        'middleSection.functionalSSOsLabel',
        'middleSection.contractorsAccountsLabel',
        'middleSection.digitalCertificatesLabel',
      ],
    },
    {
      icon: LaptopsAndDesktops,
      label: t('middleSection.laptopsLabel'),
      subcategories: [
        'middleSection.orderRefreshLabel',
        'middleSection.setupLabel',
        'middleSection.pcReturnLabel',
        'middleSection.accessoriesLabel',
        'middleSection.windowsConfigLabel',
        'middleSection.macConfigLabel',
      ],
    },
    {
      icon: RemoteAccessAndNetwork,
      label: t('middleSection.RemoteAccessLabel'),
      subcategories: [
        'middleSection.myAppsLabel',
        'middleSection.vpnLabel',
        'middleSection.rsaLabel',
        'middleSection.pingIdLabel',
        'middleSection.wiFiLabel',
      ],
    },
    {
      icon: Email,
      label: t('middleSection.emailLabel'),
      subcategories: [
        'middleSection.outlookLabel',
        'middleSection.dlLabel',
        'middleSection.sharedMailboxLabel',
        'middleSection.spamLabel',
      ],
    },
    {
      icon: ChatAndMeetingTools,
      label: t('middleSection.chatToolsLabel'),
      subcategories: [
        'middleSection.teamsLabel',
        'middleSection.skypeLabel',
        'middleSection.liveEventsLabel',
      ],
    },
    {
      icon: MobileAndPhone,
      label: t('middleSection.phoneServicesLabel'),
      subcategories: [
        'middleSection.mobileOrderEnrollLabel',
        'middleSection.geAppsLabel',
        'middleSection.refreshLabel',
        'middleSection.returnLabel',
        'middleSection.gcomLabel',
        'middleSection.dialToneLabel',
      ],
    },
    {
      icon: FileSharingAndStorage,
      label: t('middleSection.fileSharingLabel'),
      subcategories: [
        'middleSection.boxLabel',
        'middleSection.sharepointLabel',
        'middleSection.oneDriveLabel',
        'middleSection.redShareLabel',
      ],
    },
  ];
};

export const subcategorySearchMap: { [index: string]: string } = {
  'middleSection.teamcenterLabel': '@Teamcenter',
  'middleSection.powermaxLabel': '@Powermax',
  'middleSection.racesLabel': '@Races',
  'middleSection.plmLabel': '@PLMApp',
  'middleSection.tableauLabel': '@Tableau',
  'middleSection.sapLabel': '@SAP',
  'middleSection.oracleLabel': '@Oracle',

  'middleSection.secretKeyResetLabel': '@Pwdreset',
  'middleSection.functionalSSOsLabel': '@FunctionalSSOs',
  'middleSection.contractorsAccountsLabel': '@Contractorsaccounts',
  'middleSection.digitalCertificatesLabel': '+Digital Certificates',

  'middleSection.orderRefreshLabel': '@OrderRefresh',
  'middleSection.setupLabel': '@Setup',
  'middleSection.pcReturnLabel': '@Return',
  'middleSection.accessoriesLabel': '@Accessories',
  'middleSection.windowsConfigLabel': '@WindowsSetup',
  'middleSection.macConfigLabel': '@MacOSSetup',

  'middleSection.myAppsLabel': '@MyAppsFAQ',
  'middleSection.vpnLabel': '@F5VPN',
  'middleSection.rsaLabel': '@RSAFAQ',
  'middleSection.pingIdLabel': '@PingIDFAQ',
  'middleSection.wiFiLabel': '@WiFiFAQ',

  'middleSection.outlookLabel': '@OutlookFAQ',
  'middleSection.dlLabel': '@DistributionLists',
  'middleSection.sharedMailboxLabel': '@SharedMailbox',
  'middleSection.spamLabel': '@SpamPhishing',

  'middleSection.teamsLabel': '@TeamsFAQ',
  'middleSection.skypeLabel': '@SkypeFAQ',
  'middleSection.liveEventsLabel': '@LiveEvents',

  'middleSection.mobileOrderEnrollLabel': '@MobileOrderEnroll',
  'middleSection.geAppsLabel': '@DXCApps',
  'middleSection.refreshLabel': '@MobileRefresh',
  'middleSection.returnLabel': '@MobileReturn',
  'middleSection.gcomLabel': '@Gcom',
  'middleSection.dialToneLabel': '@SkypeDialTone',

  'middleSection.boxLabel': '@BoxFAQ',
  'middleSection.sharepointLabel': '@SharepointFAQ',
  'middleSection.oneDriveLabel': '@OneDriveFAQ',
  'middleSection.redShareLabel': '@REDShare',
};
