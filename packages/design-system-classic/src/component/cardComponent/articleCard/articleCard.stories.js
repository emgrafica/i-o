import React from 'react';
import ArticleCard from './articleCard';
import "../../../styles/common.scss";

export default {
  title: 'i-o/Card',
  component: ArticleCard,
};

const Template = (args) => <ArticleCard {...args} />;

export const KnowledgeArticleCardExamble = Template.bind({});
ArticleCard.args = {
};
KnowledgeArticleCardExamble.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EWof1O4DQ4gLEt0cmLwFdD?node-id=6671%3A30520'
  }

};
