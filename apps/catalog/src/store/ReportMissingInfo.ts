export interface ReportMissingInfo {
  id: string;
  productName: string | null;
  image: string | null;
  serialNumber: string | null;
  usage: string | null;
  expires: number | null;
  catalogItemId: string | null;
  caseNumber: string;
  details: string;
  _etag: string;
  __typename?: 'ReportMissingInfo';
}
