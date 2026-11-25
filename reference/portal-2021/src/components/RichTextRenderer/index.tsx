import React from 'react';
import { DocumentNode, renderRichText } from './utils';

export interface RichTextRendererProps {
  /**
   * document to parse and render with right format
   */
  document: DocumentNode;
}

/**
 * Rich text renderer meant to parse expected document object and render it correctly.
 * Is expected a contract where a Document node, contains multiple Paragraph nodes, and each Paragraph can contain texts with or without marks or links.
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
const RichTextRenderer: React.FC<RichTextRendererProps> = ({ document }) => {
  return renderRichText(document);
};

export default RichTextRenderer;
