"use client";

import { useTokenStore } from "@muatmuat/lib/auth-adapter";
import useSWR from "swr";

import { fetcherBaseURL } from "@/lib/axios";

// Use mock data for development
const USE_MOCK = false;

// Mock API result
export const MOCK_DATA = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    testimonials: [
      {
        id: "cd7445ed-6ca7-4576-bfc4-5a06e83c3169",
        userId: "0",
        username: "Ahmad Pratama",
        rating: 5,
        testimonial:
          "Layanan langganan ini sangat membantu bisnis pengiriman kami. Dengan fitur-fitur yang lengkap dan mudah digunakan, kami bisa mengelola semua proses logistik dengan lebih efisien. Tim support juga sangat responsif dalam membantu setiap kendala yang kami hadapi. Sangat direkomendasikan untuk pelaku usaha yang ingin mengembangkan bisnisnya!",
        createdAt: "2026-01-06T06:40:16.854Z",
      },
      {
        id: "1ab1ccf7-3814-4f74-977e-b23c48859447",
        userId: "0",
        username: "Siti Rahayu",
        rating: 5,
        testimonial:
          "Sejak menggunakan layanan subscription ini, proses pencarian transporter menjadi jauh lebih mudah dan cepat. Kami tidak perlu lagi repot menghubungi satu per satu transporter karena semua informasi sudah tersedia lengkap di platform. Harga berlangganan juga sangat terjangkau dibandingkan dengan manfaat yang kami dapatkan setiap harinya.",
        createdAt: "2026-01-06T06:40:16.854Z",
      },
    ],
  },
  Type: "/v1/tm/buyer_subscription/testimonial",
};

export const getTestimonials = async () => {
  let result;
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = { data: MOCK_DATA };
  } else {
    result = await fetcherBaseURL.get(`/v1/tm/buyer_subscription/testimonial`);
  }
  return result.data;
};

export const useGetTestimonials = () => {
  const accessToken = useTokenStore((state) => state.accessToken);

  return useSWR(
    accessToken ? "get-testimonials" : null,
    () => getTestimonials(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
