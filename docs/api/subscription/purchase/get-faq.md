```bash
curl --location --request POST "https://api-az.assetlogistik.com/v1/tm/faq/mp-top" \
--header "Accept: /" \
--header "Accept-Language: en-US,en;q=0.8" \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEB5b3BtYWlsLmNvbSIsInJvbGUiOiJidXllciIsImlkIjoiNDgwMyIsInNlbGxlcmlkIjpudWxsLCJpYXQiOjE3Njc2Njk1NzQsImV4cCI6MTc2Nzc1NTk3NH0.x2qzm5HDZH9qnhhv6WLZ-DS80otoLksWcdBf_JD5qbQ" \
--header "Connection: keep-alive" \
--header "Content-Type: application/json" \
--header "Cookie: FluentLocale=id_ID; U_J=9Jq7Iw2WKOO0E9TL79k0aXJybK8neaXSrQnDfVYg6cZfHoEDT8GliY5sLIir7m71jmjNVyM6ttLZW3UOe86IAaDEbvEFj4O7Uemn; G_ENABLED_IDPS=google; FluentLocale_CMS=id_ID; CookiesToken=OerZiavCNYG01Zs7LVNcGJk9NIv8iSktfiqlaFOqAtzD1qxK5F7BfGfLoYk2Qzl0MNPpZ24fWxExCZQj3l70SU0yxAodGxi6ceDs; PHPSESSID=il4kq07itu4i28gjmu5m0ul5io; U_J=EOsXONbRkRU9X33FUIvaJk0QKFBPAyxn5njvNaMjsQlxeNG3oJFZ9bZGoS3k6lQ2sipLUzPspyNFhd63dNO14fYxFfHgYy4WOZW7" \
--header "Origin: https://general-az.assetlogistik.com" \
--header "Referer: https://general-az.assetlogistik.com/muatpartsplus/subscription" \
--header "Sec-Fetch-Dest: empty" \
--header "Sec-Fetch-Mode: cors" \
--header "Sec-Fetch-Site: same-origin" \
--header "Sec-GPC: 1" \
--header "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36" \
--header "sec-ch-ua: \"Brave\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"" \
--header "sec-ch-ua-mobile: ?0" \
--header "sec-ch-ua-platform: \"Windows\"" \
--data "{
    \"category_menu_muat_id\": 57
}"
```

```json
{
  "Message": {
    "Code": 200,
    "Text": "OK (성공)"
  },
  "Data": [
    {
      "IsShowLihatSelengkapnya": 1,
      "content": "<p>muatmuat adalah Platform Ekosistem Logistik Digital Terbesar dan Terlengkap di Indonesia yang mempertemukan antara pelaku industri logistik dan pendukungnya di seluruh Indonesia. muatmuat mempertemuka...</p>",
      "category": 20,
      "subcategory": 19,
      "title": "Apa itu muatmuat?",
      "Position": 1,
      "link": "https://general-az.assetlogistik.com/traffic/redirect_faq?from=adv&force=https://faq-az.assetlogistik.com/list-content/VkZkd1FsQlJQVDA9/VkZaU2NsQlJQVDA9/VkZaU2FsQlJQVDA9"
    },
    {
      "IsShowLihatSelengkapnya": 1,
      "content": "<p>Sebagai platform e-commerce logistik, muatmuat menawarkan berbagai fitur yang dirancang untuk memfasilitasi interaksi antara Shipper dan Transporter serta mempermudah proses pemasaran dan pengiriman p...</p>",
      "category": 20,
      "subcategory": 19,
      "title": "Apa fitur muatmuat?",
      "Position": 2,
      "link": "https://general-az.assetlogistik.com/traffic/redirect_faq?from=adv&force=https://faq-az.assetlogistik.com/list-content/VkZkd1FsQlJQVDA9/VkZaU2NsQlJQVDA9/VkZaU2JsQlJQVDA9"
    },
    {
      "IsShowLihatSelengkapnya": 1,
      "content": "<p>jangan lupa lick and subrek jangan lupa lick and subrek jangan lupa lick and subrek jangan lupa lick and subrek jangan lupa lick and subrek jangan lupa lick and subrek jangan lupa lick and subrek jang...</p>",
      "category": 57,
      "subcategory": 59,
      "title": "Bagaimana Cara Subs",
      "Position": 13,
      "link": "https://general-az.assetlogistik.com/traffic/redirect_faq?from=adv&force=https://faq-az.assetlogistik.com/list-content/Vkd4U2FsQlJQVDA9/Vkd4U2NsQlJQVDA9/VkZaU1VtVlJQVDA9"
    }
  ],
  "Type": "API_get_faq_mp_top"
}
```
