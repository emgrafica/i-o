import gql from 'graphql-tag';

export const SUBMIT_FEEDBACK = gql`
  mutation SubmitFeedback($category: String!, $feedbackText: String!) {
    submitFeedback(category: $category, feedbackText: $feedbackText) {
      feedbackId
    }
  }
`;

export const FEEDBACK_CATEGORIES = gql`
  query FeedBackCategories {
    feedbackCategories
  }
`;
