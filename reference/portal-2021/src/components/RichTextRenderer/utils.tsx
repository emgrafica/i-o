import React from 'react';

export declare type NodeTypes = 'document' | 'paragraph' | 'text' | 'link';

export declare type MarkTypes = 'bold' | 'italic' | 'underline' | 'code';

/**
 * Defines marks to add style to text.
 */
export interface NodeMark {
  /**
   * Options available are bold, italic, underline and code.
   */
  type: MarkTypes;
}

/**
 * Defines extra data needed by a link node.
 */
export interface LinkNode {
  target: string;
  openOnNewWindow: boolean;
}

/**
 * Tree with for format that defines Rich text to render.
 */
export interface DocumentNode {
  /**
   * Defines the type of node. Options are document, paragraph, text and link.
   */
  nodeType: NodeTypes;

  /**
   * Node value to display. Only Text and Link nodes contain value to display.
   */
  value?: string;

  /**
   * Contains children nodes.
   * Document node contains paragraphs nodes.
   * Paragraph node contains text and link nodes.
   * Text and Link nodes don't have content.
   */
  content?: DocumentNode[];

  /**
   * Used to pass required extra data to render an specific node type.
   */
  data?: LinkNode;

  /**
   * Set style for the text. Options available are bold, italic, underline and code.
   */
  marks?: NodeMark[];
}

/**
 * Parse document node.
 */
const parseDocumentNode = (documentNode: DocumentNode) => {
  let result = <></>;
  if (documentNode.content && documentNode.content.length > 0) {
    result = (
      <>
        {documentNode.content.map((paragraph, index) =>
          renderRichText(paragraph, `document-${index}`),
        )}
      </>
    );
  }
  return result;
};

/**
 * Parse paragraph node.
 */
const parseParagraphNode = (documentNode: DocumentNode, key: string): any => {
  if (documentNode.content && documentNode.content.length > 0) {
    return (
      <p key={key}>
        {documentNode.content.map((paragraphElement, index) =>
          renderRichText(paragraphElement, `${key}-element-${index}`),
        )}
      </p>
    );
  } else {
    return null;
  }
};

/**
 * Parse node mark and render the value with the right style.
 */
const parseMark = (value: any, mark: NodeMark, key: string) => {
  switch (mark.type) {
    case 'bold':
      return <b key={`${key}-bold`}>{value}</b>;
    case 'italic':
      return <i key={`${key}-italic`}>{value}</i>;
    case 'underline':
      return <u key={`${key}-underline`}>{value}</u>;
    default:
      return value;
  }
};

/**
 * Parse text node.
 */
const parseTextNode = (documentNode: DocumentNode, key: string) => {
  if (documentNode.value) {
    let result = documentNode.value;
    if (documentNode.marks && documentNode.marks.length > 0) {
      documentNode.marks.map(
        elementMark => (result = parseMark(result, elementMark, key)),
      );
    }
    return result;
  } else {
    return null;
  }
};

/**
 * Parse link node.
 */
const parseLinkNode = (documentNode: DocumentNode, key: string) => {
  return documentNode.data ? (
    <a
      key={key}
      rel="noopener noreferrer"
      target="_blank"
      href={documentNode.data.target}
    >
      {parseTextNode(documentNode, key)}
    </a>
  ) : null;
};

/**
 * Recursive method to parse a DocumentNode and render it properly.
 * @example {
 *  nodeType: 'document',
 *  content: [
 *   {
 *     nodeType: 'paragraph',
 *      content: [
 *        {
 *         nodeType: 'text',
 *         value: 'This text will be bold',
 *         marks: [
 *           {
 *             type: 'bold'
 *           }
 *         ],
 *       },
 *       {
 *         nodeType: 'text',
 *         value: 'This text will be standard text',
 *       },
 *     ],
 *   },
 *   {
 *     nodeType: 'paragraph',
 *     content: [
 *       {
 *         nodeType: 'text',
 *         value: 'This text will be standard text ',
 *       },
 *       {
 *         nodeType: 'link',
 *         value: 'this will be a link ',
 *         data: {
 *           target: 'https://example.com',
 *           openOnNewWindow: false,
 *         }
 *       },
 *       {
 *         nodeType: 'text',
 *         value: 'this text will be standard text.',
 *       },
 *     ],
 *   },
 * ],
 *}
 */
export const renderRichText = (richtText: DocumentNode, key: string = '') => {
  switch (richtText.nodeType) {
    case 'document':
      return parseDocumentNode(richtText);
    case 'paragraph':
      return parseParagraphNode(richtText, `${key}-paragraph`);
    case 'link':
      return parseLinkNode(richtText, `${key}-link`);
    case 'text':
      return parseTextNode(richtText, `${key}-text`);
    default:
      return null;
  }
};
