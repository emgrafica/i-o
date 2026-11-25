import { gql } from 'apollo-boost';

export const SUBMIT_CSAT_FEEDBACK = gql`
  mutation SubmitCSATFeedback(
    $ticketId: String!
    $catalogClass: CatalogItemClass!
    $experienceRating: Int!
    $productHelpfulness: String!
    $feedback: String
  ) {
    submitCSATFeedback(
      ticketId: $ticketId
      catalogClass: $catalogClass
      experienceRating: $experienceRating
      productHelpfulness: $productHelpfulness
      feedback: $feedback
    ) {
      feedbackId
      timestamp
    }
  }
`;
