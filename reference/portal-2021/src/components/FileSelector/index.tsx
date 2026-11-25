import React, { useRef } from 'react';
import { Box, Typography, Button, Alert, Grid } from '@lumos/core';
import ReactDropZone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import FileListItem from './FileListItem';

/** Props type for the FileSelector component */
interface FileSelectorProps {
  /** List of supported extensions */
  supportedExtensions: string[];
  /** Max number of files the user can select */
  fileCountLimit: number;
  /** Max size of a file in MB*/
  maxFileSizeInMB: number;
  /** Callback to handle the selection change */
  onSelectionChange?: (files: File[], hasErrors: boolean) => void;
  /** List of files */
  files: File[];
}

/** File selector component */
const FileSelector: React.FC<FileSelectorProps> = ({
  fileCountLimit,
  maxFileSizeInMB,
  onSelectionChange,
  supportedExtensions,
  files,
}) => {
  /** Check if a file has a supported extension */
  const hasUnsupportedExtension = (file: File) => {
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    const unsupportedExtension =
      !extension || !supportedExtensions.includes(extension);
    return unsupportedExtension;
  };

  /** Check if a file is larger than the maximum supported size*/
  const isFileLimitExceeded = (file: any) => {
    const sizeInMB = file.size / 1024 / 1024;
    const sizeLimitExceeded = sizeInMB > maxFileSizeInMB;
    return sizeLimitExceeded;
  };

  const { t } = useTranslation('fileSelector');
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSelectionChange = (files: File[]) => {
    if (onSelectionChange) {
      const hasErrors =
        files.length > fileCountLimit ||
        files.some(isFileLimitExceeded) ||
        files.some(hasUnsupportedExtension);
      onSelectionChange(files, hasErrors);
    }
  };

  const addFiles = (selectedFiles: File[] | FileList | null) => {
    if (selectedFiles && selectedFiles.length > 0) {
      const currentFileNames = files.map(file => file.name);
      const newFiles = [...selectedFiles].filter(
        file => !currentFileNames.includes(file.name),
      );
      handleSelectionChange([...files, ...newFiles]);
    }
  };
  return (
    <>
      <Box marginBottom="20px">
        <input
          type="file"
          id="file"
          ref={inputFileRef}
          style={{ display: 'none' }}
          multiple
          onChange={(event: any) => {
            addFiles(event.target.files);
            event.target.value = null;
          }}
        />
        <ReactDropZone onDrop={droppedFiles => addFiles(droppedFiles)}>
          {({ getRootProps }) => (
            <Box {...getRootProps({ style: { outline: 'none' } })}>
              <Box
                height="173px"
                borderStyle="dashed"
                borderColor="primary.3"
                borderWidth="2px"
              >
                <Typography
                  kind="body1"
                  fontWeight="bold"
                  textAlign="center"
                  marginTop="25px"
                  marginBottom="0"
                >
                  {t('instructions')}
                </Typography>
                <Button
                  display="block"
                  marginTop="10px"
                  marginX="auto"
                  onClick={() => inputFileRef!.current!.click()}
                  id="browseFiles"
                >
                  {t('browseButton')}
                </Button>
                {files.length > 0 && (
                  <Button
                    kind="text"
                    display="block"
                    marginTop="10px"
                    marginX="auto"
                    onClick={() => handleSelectionChange([])}
                    id="removeFiles"
                  >
                    {t('clearSelectionButton')}
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </ReactDropZone>
      </Box>

      {files.length > 0 && (
        <Grid
          alignItems="center"
          flexDirection="column"
          width="100%"
          marginBottom="20px"
        >
          <Box maxWidth="575px" width="100%">
            {files.length > fileCountLimit && (
              <Alert
                marginBottom="20px"
                kind="danger"
                compact
                fullWidth
                contrast="low"
                message={t('maxNumberOfFilesExceededMessage', {
                  limit: fileCountLimit,
                })}
              />
            )}
            {files.map(file => (
              <FileListItem
                key={file.name}
                file={file}
                onRemoveClick={() => {
                  handleSelectionChange(files.filter(f => f !== file));
                }}
                maxFileSizeInMB={maxFileSizeInMB}
                supportedExtensions={supportedExtensions}
                sizeLimitExceeded={isFileLimitExceeded(file)}
                unsupportedExtension={hasUnsupportedExtension(file)}
              />
            ))}
          </Box>
        </Grid>
      )}
    </>
  );
};

export default FileSelector;
