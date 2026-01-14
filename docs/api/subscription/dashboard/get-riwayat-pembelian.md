```bash
curl --location --request GET "https://apitm-az.assetlogistik.com/v1/tm/buyer_subscription/failed-transactions?status=expired%2Ccancelled%2Cfailed&search=Paket&startDate=2024-12-01&endDate=2026-01-31&sort=DESC&page=1&limit=10" \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11YWRtdWFkMjc1QHlvcG1haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWQiOiI0Njk2Iiwic2VsbGVyaWQiOm51bGwsImlhdCI6MTc2ODM3NjgxNSwiZXhwIjoxNzY4NDYzMjE1fQ.5-v-xoh5Vt-_mpeGm6sa1gLwdc1jffq2FFUAVKv-820" \
--header "Cookie: U_J=EOsXONbRkRU9X33FUIvaJk0QKFBPAyxn5njvNaMjsQlxeNG3oJFZ9bZGoS3k6lQ2sipLUzPspyNFhd63dNO14fYxFfHgYy4WOZW7"
```

```json
{
  "Message": {
    "Code": 200,
    "Text": "OK"
  },
  "Data": {
    "purchaseHistory": [
      {
        "id": "28e3c69e-fa52-4e81-a58f-864e9f07f473",
        "transactionId": "INV/202601/SMP/24712",
        "transactionDate": "2026-01-12T04:38:35.425Z",
        "packageName": "Paket Baru Premium Ricky",
        "packageId": "61a19c37-2f31-41f6-b0f4-b21dc50aff70",
        "expiresAt": "2026-01-13T04:38:35.409Z",
        "additionalMuatkoin": "5000 muatkoin",
        "baseMuatkoin": 5000,
        "bonusMuatkoin": 0,
        "isUnlimited": false,
        "price": 5000000,
        "currency": "IDR",
        "status": "cancelled",
        "statusLabel": "Dibatalkan",
        "subUsersIncluded": 4,
        "packageDetail": {
          "name": "Paket Baru Premium Ricky",
          "price": 5000000,
          "promo": null,
          "period": 7,
          "description": "Paket Baru Premium",
          "isUnlimited": false,
          "baseMuatkoin": 5000,
          "bonusMuatkoin": 0,
          "subUsersIncluded": 4
        },
        "paymentMethod": {
          "id": "d2aa95f5-6b8e-4272-b922-624234c443a3",
          "name": "BCA Virtual Account",
          "code": "bca",
          "icon": "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740281046.webp",
          "channel": "VA",
          "fee": "4440.00",
          "feeUnit": "currency"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalData": 1,
      "limit": 10,
      "from": 1,
      "to": 1
    },
    "filters": {
      "search": "Paket",
      "startDate": "2024-12-01",
      "endDate": "2026-01-31",
      "status": "expired,cancelled,failed",
      "sort": "DESC"
    }
  },
  "Type": "/v1/tm/buyer_subscription/failed-transactions?status=expired%2Ccancelled%2Cfailed&search=Paket&startDate=2024-12-01&endDate=2026-01-31&sort=DESC&page=1&limit=10"
}
```
