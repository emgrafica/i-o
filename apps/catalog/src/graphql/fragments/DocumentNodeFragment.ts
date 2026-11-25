import gql from 'graphql-tag';

const DocumentNodeFragment = gql`
  fragment DocumentNodeFields on DocumentNode {
    nodeType
    value
    marks {
      type
    }
    data {
      target
      openOnNewWindow
    }
  }
`;

const DOCUMENT_NODE_FRAGMENT = gql`
  fragment DocumentNode on DocumentNode {
    ...DocumentNodeFields
    content {
      ...DocumentNodeFields
      content {
        ...DocumentNodeFields
      }
    }
  }
  ${DocumentNodeFragment}
`;

export default DOCUMENT_NODE_FRAGMENT;
