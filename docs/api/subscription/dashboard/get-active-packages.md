```bash
curl --location --request GET "https://api-az.assetlogistik.com/v1/tm/buyer_subscription/active-packages?page=1&limit=10" \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyaWRheWFyc0BnbWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWQiOiIyODgzIiwic2VsbGVyaWQiOiJmMmQ4NjFkNy1mN2VjLTQ4NjctOGMyNC04OWZkM2U5YTZlOTYiLCJpYXQiOjE3Njc4NDI1ODYsImV4cCI6MTc2NzkyODk4Nn0.IENlFsw-B4UDjPpa6mTX1muBmIiJRxvDT7GlBy6XFT8" \
--header "Cookie: U_J=EOsXONbRkRU9X33FUIvaJk0QKFBPAyxn5njvNaMjsQlxeNG3oJFZ9bZGoS3k6lQ2sipLUzPspyNFhd63dNO14fYxFfHgYy4WOZW7"
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
        "id": "19af6f7c-ae21-43e6-87ce-d8412f07f590",
        "purchaseId": "91d69539-b37d-4150-ad6b-35fd92981cf3",
        "transactionId": "INV/202601/SMP/55368",
        "packageName": "coba sekali lagi di ubah",
        "totalMuatkoin": 600,
        "isUnlimited": false,
        "expirationDate": "2026-02-05T07:12:24.407Z",
        "startDate": "2026-01-06T07:12:24.412Z",
        "remainingMuatkoin": 400,
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
        }
      },
      {
        "id": "8297b0dc-5b4b-4600-8665-69f4e4780b31",
        "purchaseId": "6183aef2-27f3-44f8-986d-7f9e2733769d",
        "transactionId": "INV/202601/SMP/38539",
        "packageName": "coba sekali lagi di ubah",
        "totalMuatkoin": 500,
        "isUnlimited": false,
        "expirationDate": "2026-02-01T06:29:44.369Z",
        "startDate": "2026-01-06T08:46:20.699Z",
        "remainingMuatkoin": 500,
        "packageDetail": {
          "name": "coba sekali lagi di ubah",
          "price": 1000,
          "promo": null,
          "period": 30,
          "description": "ini deskripsi",
          "isUnlimited": false,
          "baseMuatkoin": 500,
          "bonusMuatkoin": 0,
          "subUsersIncluded": 52
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalData": 2,
      "limit": 10,
      "from": 1,
      "to": 2
    },
    "filters": {
      "search": null,
      "sort": "DESC"
    }
  },
  "Type": "/v1/tm/buyer_subscription/active-packages?page=1&limit=10"
}
```
