```bash
curl --location 'https://api-az.assetlogistik.com/v1/tm/buyer_subscription/packages' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcnJpZV90bXNoaXBwZXJAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWQiOiI0Nzg3Iiwic2VsbGVyaWQiOm51bGwsImlhdCI6MTc2NzMzNjkxMiwiZXhwIjoxNzY3NDIzMzEyfQ.YczopwqZK3VCof5ftwhcCLccepITC0TyKKosrvTigF8'
```

```json
{
  "Message": {
    "Code": 200,
    "Text": "OK"
  },
  "Data": {
    "packages": [
      {
        "id": "1e45854b-c0e6-4d92-b079-48ec60b46723",
        "name": "coba sekali lagi di ubah",
        "description": "ini deskripsi",
        "muatkoin": 500,
        "isUnlimited": false,
        "price": 1000,
        "originalPrice": null,
        "currency": "IDR",
        "period": 30,
        "periodLabel": "Masa Aktif 30 Hari",
        "isPopular": false,
        "isRecommended": false,
        "subUsersIncluded": 52,
        "bonusMuatkoin": null,
        "promo": null,
        "purchaseLimit": 3,
        "purchaseLimitEnabled": true,
        "userEligible": true,
        "canPurchase": true
      },
      {
        "id": "405edb1b-b453-4be8-bcec-816efcd1e95f",
        "name": "basic",
        "description": "test",
        "muatkoin": 11,
        "isUnlimited": false,
        "price": 1111,
        "originalPrice": null,
        "currency": "IDR",
        "period": 30,
        "periodLabel": "Masa Aktif 30 Hari",
        "isPopular": true,
        "isRecommended": true,
        "subUsersIncluded": 1,
        "bonusMuatkoin": null,
        "promo": null,
        "purchaseLimit": 1,
        "purchaseLimitEnabled": true,
        "userEligible": true,
        "canPurchase": true
      },
      {
        "id": "05a8aa94-6167-4ede-b029-185ca48c9d2e",
        "name": "sdassda",
        "description": "sdsasadsad",
        "muatkoin": 11,
        "isUnlimited": false,
        "price": 1111,
        "originalPrice": null,
        "currency": "IDR",
        "period": 7,
        "periodLabel": "Masa Aktif 7 Hari",
        "isPopular": false,
        "isRecommended": false,
        "subUsersIncluded": 22,
        "bonusMuatkoin": null,
        "promo": null,
        "purchaseLimit": null,
        "purchaseLimitEnabled": false,
        "userEligible": true,
        "canPurchase": true
      }
    ]
  },
  "Type": "/v1/tm/buyer_subscription/packages"
}
```
