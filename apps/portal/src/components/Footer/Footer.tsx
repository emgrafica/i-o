// @ts-nocheck
import React from 'react';
import { useTranslation } from 'react-i18next';
import { env, variables } from '../../utils/env';
import { FooterEnums } from './constants';
import { CopyrightData } from './constants';
import { IoFooter } from '@i-o/design-system';

const getPrefix = () => {
  if (env(variables.environment) !== FooterEnums.prod) {
    return `${env(variables.environment)}_`;
  }
  return '';
};

/**
 * Application footer.
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const getCopyright = () => {
    if (env(variables.environment) && env(variables.buildNumber)) {
      return `© ${t('footer:copyright')} | ${env(variables.buildNumber)}`;
    }
    return `© ${t('footer:copyright')}`;
  };
  const copyrightData = CopyrightData.map(item => ({
    ...item,
    title: t(`footer:${item.title}`),
  }));

  return (
    <IoFooter copyright={getCopyright()} copyrightData={copyrightData} />
  );
};

export default Footer;
