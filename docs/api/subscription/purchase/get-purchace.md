```bash
curl --location --request GET "https://api-az.assetlogistik.com/v1/tm/buyer_subscription/purchase-history?status=pending&page=1&limit=10" \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyaWRheWFyc0BnbWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWQiOiIyODgzIiwic2VsbGVyaWQiOiJmMmQ4NjFkNy1mN2VjLTQ4NjctOGMyNC04OWZkM2U5YTZlOTYiLCJpYXQiOjE3Njc2ODA0ODksImV4cCI6MTc2Nzc2Njg4OX0.0RjcT8OTj93ddLwlNMQyDUolFWklU-SoYBpiE34acTA" \
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
        "id": "91d69539-b37d-4150-ad6b-35fd92981cf3",
        "transactionId": "INV/202601/SMP/55368",
        "transactionDate": "2026-01-06T06:26:23.830Z",
        "packageName": "coba sekali lagi di ubah",
        "packageId": "1e45854b-c0e6-4d92-b079-48ec60b46723",
        "expiresAt": "2026-01-07T06:26:23.829Z",
        "additionalMuatkoin": "550 + 50 Free muatkoin",
        "baseMuatkoin": 550,
        "bonusMuatkoin": 50,
        "isUnlimited": false,
        "price": 8,
        "currency": "IDR",
        "status": "pending",
        "statusLabel": "Pending",
        "subUsersIncluded": 52,
        "packageDetail": {
          "name": "coba sekali lagi di ubah",
          "price": 8,
          "promo": {
            "id": "2528c054-dad7-4ef2-928f-fb2e02ac715b",
            "discount": 2,
            "bonusMuatkoin": 50
          },
          "period": 30,
          "description": "ini deskripsi",
          "isUnlimited": false,
          "baseMuatkoin": 550,
          "bonusMuatkoin": 50,
          "subUsersIncluded": 52
        },
        "paymentMethod": {
          "id": "82f6d054-b81e-4fb7-9af1-0cfb98757e19",
          "name": "QRIS",
          "code": "qris",
          "icon": "https://azlogistik.s3.ap-southeast-3.amazonaws.com/undefined/file-1739245433414.webp",
          "channel": "QRIS",
          "fee": "0.70",
          "feeUnit": "percentage"
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
      "search": null,
      "startDate": null,
      "endDate": null,
      "status": "pending",
      "sort": "DESC"
    }
  },
  "Type": "/v1/tm/buyer_subscription/purchase-history?status=pending&page=1&limit=10"
}
```
