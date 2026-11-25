import { useQuery, useMutation } from '@apollo/react-hooks';
import { ReportBrokenInput } from 'gqlTypes/globalTypes';
import {
  ReportBrokenInfo,
  ReportBrokenInfo_reportBrokenInfo,
} from '../actions/queries/gqlTypes/ReportBrokenInfo';
import {
  SetReportBrokenInfo,
  SetReportBrokenInfoVariables,
} from '../actions/mutations/gqlTypes/SetReportBrokenInfo';
import { SET_REPORT_BROKEN_INFO } from '../actions/mutations';
import { REPORT_BROKEN_INFO } from '../actions/queries';

export function useReportBrokenInfo(): ReportBrokenInfo_reportBrokenInfo | null {
  const { data } = useQuery<ReportBrokenInfo>(REPORT_BROKEN_INFO);
  if (data) {
    return data.reportBrokenInfo;
  }
  return null;
}

export function useSetReportBrokenInfo() {
  const [setReportBrokenInfo] = useMutation<
    SetReportBrokenInfo,
    SetReportBrokenInfoVariables
  >(SET_REPORT_BROKEN_INFO);

  return (reportBrokenInput: ReportBrokenInput | null) =>
    setReportBrokenInfo({
      variables: { reportBrokenInput },
    });
}
