```bash
curl --location --request GET "https://api-az.assetlogistik.com/v1/tm/buyer_subscription/all-transactions?type=purchase&page=1&limit=10" \
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
    "transactions": [
      {
        "id": "91d69539-b37d-4150-ad6b-35fd92981cf3",
        "type": "purchase",
        "transactionId": "INV/202601/SMP/55368",
        "date": "2026-01-06T06:26:23.830Z",
        "description": "Pembelian Paket coba sekali lagi di ubah",
        "amount": 8,
        "muatkoinChange": 550,
        "status": "paid"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalData": 1,
      "limit": 10
    }
  },
  "Type": "/v1/tm/buyer_subscription/all-transactions?type=purchase&page=1&limit=10"
}
```
