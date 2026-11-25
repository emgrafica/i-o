import React from 'react';
import SupportArticle from './supportArticle';

export default {
  title: 'i-o/Card/Support Article Card',
  component: SupportArticle,
};
    
const Template = (args) => <SupportArticle {...args} />;

// ***********************************
// *   01) Feature Card
// ***********************************
export const SupportArticleInfo = Template.bind({});
SupportArticleInfo.storyName = '01) Support Feature Card';
SupportArticleInfo.args = {
    direction: "horizontal",
    kbNumber: "",
    cardType: "",
    cardTitleMaxRox: 2,
    cardTitle: "Universal ID -- First time login and Portal overview",
    cardDesc:
      "Universal ID is replacing Global Pass as the new way you will log into DXC sites, applications and tools. Universal ID will be rolled out in phases. Access the Universal ID PortalOpen uid.dxc.com",
    cardImg: null,
    rate: 4,
    lastUpdated: "2 days ago",
    viewCount: 10,
};


// ***********************************
// *   02) Support Announcement Card
// ***********************************
export const SupportAnnouncementArticleInfo = Template.bind({});
SupportAnnouncementArticleInfo.storyName = '02) Support Announcement Card';
SupportAnnouncementArticleInfo.args = {
    direction: "horizontal",
    kbNumber: "",
    cardType: "ANNOUNCEMENTS",
    cardTitleMaxRox: 2,
    cardTitle: "Universal ID -- First time login and Portal overview",
    cardDesc:
      "Universal ID is replacing Global Pass as the new way you will log into DXC sites, applications and tools. Universal ID will be rolled out in phases. Access the Universal ID PortalOpen uid.dxc.com",
    cardImg: null,
    rate: 4,
    lastUpdated: "2 days ago",
    viewCount: 10,
};

