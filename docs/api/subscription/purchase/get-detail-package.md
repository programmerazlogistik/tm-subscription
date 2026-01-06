```bash
curl --location 'https://api-az.assetlogistik.com/v1/tm/buyer_subscription/purchase/packages/1e45854b-c0e6-4d92-b079-48ec60b46723' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcnJpZV90bXNoaXBwZXJAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWQiOiI0Nzg3Iiwic2VsbGVyaWQiOm51bGwsImlhdCI6MTc2NzMzNjkxMiwiZXhwIjoxNzY3NDIzMzEyfQ.YczopwqZK3VCof5ftwhcCLccepITC0TyKKosrvTigF8'
```

```json
{
  "Message": {
    "Code": 200,
    "Text": "OK"
  },
  "Data": {
    "id": "1e45854b-c0e6-4d92-b079-48ec60b46723",
    "name": "coba sekali lagi di ubah",
    "description": "ini deskripsi",
    "muatkoin": 500,
    "bonusMuatkoin": null,
    "isUnlimited": false,
    "isRecommended": false,
    "price": 1000,
    "originalPrice": null,
    "period": 30,
    "subUsersIncluded": 52,
    "promo": null
  },
  "Type": "/v1/tm/buyer_subscription/purchase/packages/1e45854b-c0e6-4d92-b079-48ec60b46723"
}
```
