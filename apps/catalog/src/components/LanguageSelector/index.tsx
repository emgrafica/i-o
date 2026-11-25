import React from 'react';
import { PopoverMenu } from '@lumos/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { IPopoverMenuOption } from '@lumos/core/lib/components/PopoverMenu/PopoverMenu';
import { DropDownButton } from './DropDownButton';

/** Enumeration of the supported languages **/
export type LanguageCode =
  | 'de'
  | 'en'
  | 'es'
  | 'fr'
  | 'hu'
  | 'it'
  | 'ja'
  | 'ko'
  | 'pl'
  | 'pt'
  | 'pt_BR' // needed for knowledge article search
  | 'ru'
  | 'zh-Hans'
  | 'zh';

/** Interface for the LanguageSelector component **/
interface LanguageSelectorProps {
  onChange: (languageCode: LanguageCode) => void;
  languageCode: LanguageCode;
  kind: 'app-content' | 'knowledge-articles-search';
}

/** Language selector for the get support page */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onChange,
  languageCode,
  kind,
}) => {
  const [popoverMenuOpen, setPopoverMenuOpen] = React.useState(false);

  /** Sets search language */
  const onClickFn = (selected: IPopoverMenuOption<LanguageCode>): void => {
    onChange(selected.value);
  };
  const languageOptions: {
    label: string;
    value: LanguageCode;
    onClickFn: (selected: IPopoverMenuOption<LanguageCode>) => void;
  }[] = [
    { label: 'English', value: 'en', onClickFn },
    { label: 'Deutsch', value: 'de', onClickFn },
    { label: 'Español', value: 'es', onClickFn },
    {
      label: 'Français',
      value: 'fr',
      onClickFn,
    },
    {
      label: 'Italiano',
      value: 'it',
      onClickFn,
    },
    { label: 'Magyar', value: 'hu', onClickFn },
    { label: 'Polski', value: 'pl', onClickFn },
    {
      label: 'Português',
      value: kind === 'app-content' ? 'pt' : 'pt_BR',
      onClickFn,
    },
    { label: 'Русский', value: 'ru', onClickFn },
    {
      label: '中文',
      value: kind === 'app-content' ? 'zh-Hans' : 'zh',
      onClickFn,
    },
    { label: '日本語', value: 'ja', onClickFn },
    { label: '한국어', value: 'ko', onClickFn },
  ];
  const language =
    languageOptions.find(item => item.value === languageCode) ||
    languageOptions[0];

  return (
    <PopoverMenu
      id="language"
      options={languageOptions}
      onOpen={() => setPopoverMenuOpen(true)}
      onClose={() => setPopoverMenuOpen(false)}
    >
      <DropDownButton
        kind="text"
        margin={1}
        withIconOnRight={popoverMenuOpen ? <ExpandLess /> : <ExpandMore />}
        color={kind === 'app-content' ? 'grayScale.0' : 'state.enabled'}
      >
        {language.label}
      </DropDownButton>
    </PopoverMenu>
  );
};

export default LanguageSelector;
