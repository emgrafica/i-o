import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchWhatsnewListItem: ['currentUser'],
  fetchWhatsnewListItemSuccess: ['whatsNewList'],
  setWhatsNewErrorAction: ['error'],
});

export const WhatsnewTypes = Types;
export default Creators;

