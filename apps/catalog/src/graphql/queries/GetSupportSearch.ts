import { gql } from 'apollo-boost';

export const GET_SUPPORT_SEARCH = gql`
  query GetSupportSearch(
    $keywords: String!
    $pageSize: Int
    $knowledgeArticlePageNumber: Int
    $knowledgeArticleLanguage: KnowledgeArticleLanguageCode
    $businessApplicationPageNumber: Int
    $businessApplicationBusinessFilter: String
  ) {
    knowledgeArticleSearch(
      keywords: $keywords
      language: $knowledgeArticleLanguage
      pageSize: $pageSize
      pageNumber: $knowledgeArticlePageNumber
    ) {
      totalItems
      pageSize
      pageNumber
      totalPages
      items {
        id
        title
        extracts
        description
        url
      }
    }
    businessApplicationSearch(
      keywords: $keywords
      pageSize: $pageSize
      pageNumber: $businessApplicationPageNumber
      business: $businessApplicationBusinessFilter
    ) {
      pageSize
      pageNumber
      totalItems
      totalPages
      items {
        name
        number
        shortDescription
        id
        business
        serviceId
        serviceOfferingId
        assignmentGroup
        questionnaire
        type
        url
        userDefinedShortDescription
      }
      businessFilters
    }
  }
`;
