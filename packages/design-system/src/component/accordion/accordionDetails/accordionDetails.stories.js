import React from 'react';
import AccordionDetails from './accordionDetails';

export default {
  title: 'i-o/Accordion/Details',
  component: AccordionDetails,
};
    
const Template = (args) => <AccordionDetails {...args} />;

// ***********************************
// *   01) Accordion Details
// ***********************************
export const AccordionDetailsInfo = Template.bind({});
AccordionDetailsInfo.storyName = '01) Accordion Details';
AccordionDetailsInfo.args = {
  kbNumber: "",
  type: "ANNOUNCEMENTS",
  title: "Universal ID -- First time login and Portal overview",
  desc:
    "Universal ID is replacing Global Pass as the new way you will log into DXC sites, applications and tools. Universal ID will be rolled out in phases. Access the Universal ID PortalOpen uid.dxc.com",
  cardImg: null,
  rate: 4,
  lastUpdated: "2 days ago",
  viewCount: 10,
};

