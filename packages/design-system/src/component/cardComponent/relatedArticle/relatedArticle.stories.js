import React from 'react';
import RelatedArticle from './relatedArticle';

export default {
  title: 'i-o/Card',
  component: RelatedArticle,
};
    
const Template = (args) => <RelatedArticle {...args} />;

export const RelatedArticleCard = Template.bind({});
RelatedArticle.args = {};
 