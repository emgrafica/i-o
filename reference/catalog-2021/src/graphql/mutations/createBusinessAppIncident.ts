import { gql } from 'apollo-boost';

export const CREATE_BUSINESS_APP_INCIDENT = gql`
  mutation createBusinessAppIncident(
    $createdOn: String
    $shortDescription: String!
    $description: String!
    $assignmentGroup: String!
    $productL1: String!
    $productL2: String!
    $externalId: String
    $urgency: BusinessApplicationIncidentUrgency
    $filesToBeAttached: [String!]
  ) {
    createBusinessAppIncident(
      createdOn: $createdOn
      shortDescription: $shortDescription
      description: $description
      assignmentGroup: $assignmentGroup
      productL1: $productL1
      productL2: $productL2
      externalId: $externalId
      urgency: $urgency
      filesToBeAttached: $filesToBeAttached
    ) {
      tenantDisplayId
      id
    }
  }
`;
