import { fetcherMuatrans } from "@/lib/axios";

/**
 * Post variable pricing data to the API
 * @param {Object} data - The variable pricing data to post
 * @returns {Promise} - Axios response promise
 */
export const postVariablePricing = async (data) => {
  return fetcherMuatrans.post("/v1/bo/pricing/setting/variable", data);
};