import { useQuery, useMutation } from '@apollo/react-hooks';
import { REPLACEMENT_INFO } from '../actions/queries';
import { SET_REPLACEMENT_INFO } from '../actions/mutations';
import {
  SetReplacementInfo,
  SetReplacementInfoVariables,
} from '../actions/mutations/gqlTypes/SetReplacementInfo';
import {
  ReplacementInfo,
  ReplacementInfo_replacementInfo,
} from '../actions/queries/gqlTypes/ReplacementInfo';
import { ProductInfo } from 'gqlTypes/globalTypes';

export function useReplacementInfo(): ReplacementInfo_replacementInfo | null {
  const { data } = useQuery<ReplacementInfo>(REPLACEMENT_INFO);
  if (data) {
    return data.replacementInfo;
  }
  return null;
}

export function useSetReplacementInfo() {
  const [setReplacementInfo] = useMutation<
    SetReplacementInfo,
    SetReplacementInfoVariables
  >(SET_REPLACEMENT_INFO);

  return (productInfo: ProductInfo | null) =>
    setReplacementInfo({
      variables: { productInfo },
    });
}
