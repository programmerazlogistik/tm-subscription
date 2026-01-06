```bash
curl --location --request POST 'https://general-az.assetlogistik.com/api/get_faq_mp_top' \
--header 'user-agent: Dart/3.8 (dart:io)' \
--header 'languageid: c5326209-8336-40f3-bf0f-b7ec8f44bab2' \
--header 'accept-encoding: gzip' \
--header 'content-length: 228' \
--header 'host: general-az.assetlogistik.com' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Implbmdsb3RAeW9wbWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWQiOiIzMzk5Iiwic2VsbGVyaWQiOiI1Y2JjYWRlMy04ZWJiLTRjYjEtYjY1Yy02YWE3NDk4MDY4ZTMiLCJpYXQiOjE3Njc2ODgyNzQsImV4cCI6MTc2Nzc3NDY3NH0.kHPfiAoGjLCJ8eJ1SQTqTb1kqxF1536qy_kPJIBsVNw' \
--header 'content-type: application/json' \
--header 'loginas: buyer' \
--header 'platform: mobile' \
--data-raw '{"category_menu_muat_id":57,"base_data":"{\"App\":\"1\",\"Locale\":\"en-US\",\"Email\":\"jenglot@yopmail.com\",\"Token\":\"ZjJjMWExZWRmZjRlMjBjYzU0N2JiMTRkZGNiYTVlZGU1YTM0NjBmNQ--\",\"Key\":\"AZthebestsystem\",\"ID\":\"3399\"}"}'
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
