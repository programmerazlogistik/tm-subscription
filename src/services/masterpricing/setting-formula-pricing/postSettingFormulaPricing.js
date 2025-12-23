import useSWRMutation from "swr/mutation";

import { fetcherMock, fetcherMuatrans } from "@/lib/axios";

const isMockSettingFormulaPricing = false;

export const fetcherSettingFormulaPricing = async (url, { arg }) => {
  if (isMockSettingFormulaPricing) {
    const result = await fetcherMock.post(`/api/${url}`, arg ?? null);
    return result.data;
  }
  const result = await fetcherMuatrans.post(url, arg);
  return result.data;
};

export const usePostSettingFormulaPricing = () => {
  const baseUrl = "v1/bo/pricing/setting/formula-pricing";

  return useSWRMutation(baseUrl, (url, { arg }) => {
    return fetcherSettingFormulaPricing(url, { arg });
  });
};
