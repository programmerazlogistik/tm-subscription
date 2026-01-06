"use client";

import { useTokenStore } from "@muatmuat/lib/auth-adapter";
import useSWR from "swr";

import { fetcherGeneral } from "@/lib/axios";

// Use mock data for development
const USE_MOCK = true;

// Mock API result
export const MOCK_DATA = {
  Message: {
    Code: 200,
    Text: "OK (성공)",
  },
  Data: [
    {
      IsShowLihatSelengkapnya: 1,
      content:
        "<p>muatmuat adalah Platform Ekosistem Logistik Digital Terbesar dan Terlengkap di Indonesia yang mempertemukan antara pelaku industri logistik dan pendukungnya di seluruh Indonesia. muatmuat mempertemuka...</p>",
      category: 20,
      subcategory: 19,
      title: "Apa itu muatmuat?",
      Position: 1,
      link: "https://general-az.assetlogistik.com/traffic/redirect_faq?from=adv&force=https://faq-az.assetlogistik.com/list-content/VkZkd1FsQlJQVDA9/VkZaU2NsQlJQVDA9/VkZaU2FsQlJQVDA9",
    },
    {
      IsShowLihatSelengkapnya: 1,
      content:
        "<p>Sebagai platform e-commerce logistik, muatmuat menawarkan berbagai fitur yang dirancang untuk memfasilitasi interaksi antara Shipper dan Transporter serta mempermudah proses pemasaran dan pengiriman p...</p>",
      category: 20,
      subcategory: 19,
      title: "Apa fitur muatmuat?",
      Position: 2,
      link: "https://general-az.assetlogistik.com/traffic/redirect_faq?from=adv&force=https://faq-az.assetlogistik.com/list-content/VkZkd1FsQlJQVDA9/VkZaU2NsQlJQVDA9/VkZaU2JsQlJQVDA9",
    },
    {
      IsShowLihatSelengkapnya: 1,
      content:
        "<p>jangan lupa lick and subrek jangan lupa lick and subrek jangan lupa lick and subrek jangan lupa lick and subrek jangan lupa lick and subrek jangan lupa lick and subrek jangan lupa lick and subrek jang...</p>",
      category: 57,
      subcategory: 59,
      title: "Bagaimana Cara Subs",
      Position: 13,
      link: "https://general-az.assetlogistik.com/traffic/redirect_faq?from=adv&force=https://faq-az.assetlogistik.com/list-content/Vkd4U2FsQlJQVDA9/Vkd4U2NsQlJQVDA9/VkZaU1VtVlJQVDA9",
    },
  ],
  Type: "API_get_faq_mp_top",
};

export const getFaq = async (categoryMenuMuatId = 57) => {
  let result;
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = { data: MOCK_DATA };
  } else {
    result = await fetcherGeneral.post(
      `/api/get_faq_mp_top`,
      {
        category_menu_muat_id: categoryMenuMuatId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          loginas: "buyer",
          platform: "mobile",
        },
      }
    );
  }
  return result.data;
};

export const useGetFaq = (categoryMenuMuatId = "57") => {
  const accessToken = useTokenStore((state) => state.accessToken);

  return useSWR(
    accessToken ? `get-faq-${categoryMenuMuatId}` : null,
    () => getFaq(categoryMenuMuatId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
