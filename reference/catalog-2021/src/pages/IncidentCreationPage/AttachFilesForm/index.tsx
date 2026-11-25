import React, { useState } from 'react';
import { Grid, Typography } from '@lumos/core';
import SectionHeader from 'components/SectionHeader';
import { useTranslation } from 'react-i18next';
import FileSelector from 'components/FileSelector';

const FILE_COUNT_LIMIT = 10;
const FILE_SIZE_LIMIT_IN_MB = 25;
// prettier-ignore
const SUPPORTED_EXTENSIONS = [
  'doc','docx','xls','xlc','xlm','xlsx','xlt', 'xla','xltx','txt','dot','dotx','xml','zip',
  'png','gif','jpg','pjpeg','pdf','vsd','csv', 'jpeg','p7','p7c','p7m','xlsm','bmp', 'ppt',
  'pot', 'pps', 'p7s', 'java', 'odt', 'fodt', 'ods', 'fods', 'odp', 'fodp', 'rtf', 'mp4',
  'sas', 'gzip', 'license', 'crt', 'der', 'htm', 'html', 'wav', 'm2a', 'docm', 'gz',
  'log', 'mdb', 'b64', 'ai', 'eps', 'ps', 'eml', 'mhtml', 'mht', 'ics', 'rar', 'bmp', 'dat',
  'ppt', 'pot', 'pps', 'ppa', 'pptx', 'ppz', 'pwz', 'mpp', 'swf', 'vcf', 'mp4', 'bm', 'c++',
  'c', 'class', 'lsx', 'ras', 'rat', 'php', 'jsp', 'msg', 'gif', 'vst', 'vstx', 'mp3', 'mov', 'eml',
  'z', 'rtx', 'avi', 'bas', 'nws', 'wmv', 'tgz', 'vcf', 'css', 'jpe', 'pfx', 'qt', 'ico', 'stm',
  'wcm', 'wdb', 'wks', 'wps', 'm4a', 'hta', 'pub', 'pcx', 'dwg', 'dxf', 'acd', 'asp', 'pls', 'ico',
  'xer', 'xps', 'hhc', 'ods', 'ocx', 'one', 'onea', 'onepkg', 'onetmp', 'onetoc', 'onetoc2', 'odh',
  'odl', 'c++', 'pfb', 'pfm', 'pkgdef', 'pkgundef', 'pnt', 'pntg', 'pnz', 'mqv', 'gtar', 'tar', 'wmz',
  'mp4v', 'eot', 'sql', 'ttf', 'svg', 'woff', 'otf', 'iix', 'rep',
];
SUPPORTED_EXTENSIONS.sort();

interface AttachFilesFormProps {
  /** Callback to handle the selection change */
  onSelectionChange?: (files: File[], hasErrors: boolean) => void;
  /** List of files */
  files: File[];
}
const AttachFilesForm: React.FC<AttachFilesFormProps> = ({
  onSelectionChange,
  files,
}) => {
  const { t } = useTranslation('incident');

  const [fileCount, setFileCount] = useState(0);
  return (
    <Grid flexDirection="column" marginTop="48px">
      <SectionHeader
        title={t('attachFilesSection.header.title')}
        subtitle={
          fileCount === 0
            ? t('attachFilesSection.header.optionalLabel')
            : t('attachFilesSection.header.fileCount', { count: fileCount })
        }
        info={t('attachFilesSection.header.maxSizeInfo', {
          limit: FILE_SIZE_LIMIT_IN_MB,
        })}
      />
      <Typography kind="body2" marginTop="0">
        {t('attachFilesSection.instructions', {
          limit: FILE_COUNT_LIMIT,
        })}
      </Typography>

      <FileSelector
        fileCountLimit={FILE_COUNT_LIMIT}
        maxFileSizeInMB={FILE_SIZE_LIMIT_IN_MB}
        supportedExtensions={SUPPORTED_EXTENSIONS}
        files={files}
        onSelectionChange={(files, hasErrors) => {
          setFileCount(files.length);
          if (onSelectionChange) onSelectionChange(files, hasErrors);
        }}
      />
    </Grid>
  );
};

export default AttachFilesForm;
