import React from 'react';
import NotificationPrompt from './notificationPrompt';

export default {
  title: 'i-o/Card',
  component: NotificationPrompt,
};

const Template = (args) => <NotificationPrompt {...args} />;

export const NotificationPromptExamble = Template.bind({});
NotificationPrompt.args = {
};
NotificationPromptExamble.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=2608%3A87960'
  }

};
