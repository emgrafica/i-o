import React from 'react';
import { Box, Typography, Grid, Popover } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { ErrorIcon } from './ErrorIcon';
import { DeleteIcon } from './DeleteIcon';
import { CheckIcon } from './CheckIcon';
import { ClampText } from 'components/ClampText';
import { HelpIcon } from './HelpIcon';

/** Props type for the FileList component */
interface FileListItemProps {
  /** The file that the item represents */
  file: File;
  /** Callback to handle the click on the remove button */
  onRemoveClick: () => void;
  /**
   * Indicates if the file limit is exceeded.
   * It's used to display an error message.
   */
  sizeLimitExceeded: boolean;
  /**
   * Indicates if the file has an unsupported extension.
   * It's used to display an error message.
   */
  unsupportedExtension: boolean;
  /**
   * Max file size supported in MB.
   * This info is shown in the error message.
   */
  maxFileSizeInMB: number;
  /**
   * List of supported extensions
   * This info is shown in the error message.
   */
  supportedExtensions: string[];
}

/**
 * Renders a file list item for the list of selected files in the
 * FileSelector component
 **/
const FileListItem: React.FC<FileListItemProps> = ({
  file,
  onRemoveClick,
  maxFileSizeInMB,
  supportedExtensions,
  sizeLimitExceeded,
  unsupportedExtension,
}) => {
  const { t } = useTranslation('fileSelector');

  let errorMessage;
  if (unsupportedExtension) errorMessage = t('fileNotSupportedErrorMessage');
  else if (sizeLimitExceeded)
    errorMessage = t('fileSizeErrorMessage', { limit: maxFileSizeInMB });

  return (
    <Grid alignItems="center">
      {errorMessage ? <ErrorIcon /> : <CheckIcon />}
      <Box flex="1 1 0px">
        <ClampText maxLineCount={1}>
          <Typography kind="body2" display="inline" marginLeft="10px">
            {file.name}
          </Typography>
        </ClampText>
      </Box>

      {errorMessage && (
        <Grid flex="1 1 0px">
          <ClampText maxLineCount={1}>
            <Typography
              kind="body3"
              display="inline"
              marginLeft="10px"
              color="state.warning"
            >
              {errorMessage}
            </Typography>
          </ClampText>
          {unsupportedExtension && (
            <Popover
              id="enabled"
              width="493px"
              padding="22px"
              content={
                <Box margin="16px">
                  <Typography kind="subtitle2">
                    {t('fileNotSupportedHelpMessage')}
                  </Typography>
                  <Typography kind="body3" marginBottom="0">
                    {supportedExtensions.join(', ')}
                  </Typography>
                </Box>
              }
              placement="bottom"
              trigger="hover"
            >
              <HelpIcon fontSize="small" />
            </Popover>
          )}
        </Grid>
      )}
      <Box marginLeft="auto" paddingLeft="44px">
        <DeleteIcon onClick={onRemoveClick} />
      </Box>
    </Grid>
  );
};

export default FileListItem;
