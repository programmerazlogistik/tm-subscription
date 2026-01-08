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
        "id": "6183aef2-27f3-44f8-986d-7f9e2733769d",
        "type": "purchase",
        "transactionId": "INV/202601/SMP/38539",
        "date": "2026-01-06T08:16:00.756Z",
        "description": "Pembelian Paket coba sekali lagi di ubah",
        "amount": 8,
        "muatkoinChange": 550,
        "status": "paid"
      },
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
      "totalData": 2,
      "limit": 10
    }
  },
  "Type": "/v1/tm/buyer_subscription/all-transactions?type=purchase&page=1&limit=10"
}

{
    "Message": {
        "Code": 200,
        "Text": "OK"
    },
    "Data": {
        "transactions": [
            {
                "id": "635b9965-ed9b-4a78-99f7-2bdd35d8ca99",
                "type": "usage",
                "transactionId": "754",
                "date": "2026-01-06T15:23:35.092Z",
                "description": "Deduction for view_bid_participant - Reference: 754",
                "amount": null,
                "muatkoinChange": -50,
                "status": "completed"
            },
            {
                "id": "446c6b52-d6e4-4dd7-a925-f23e2c9ac2d3",
                "type": "usage",
                "transactionId": "754",
                "date": "2026-01-06T10:54:42.664Z",
                "description": "Deduction for view_bid_detail_participate - Reference: 754",
                "amount": null,
                "muatkoinChange": -100,
                "status": "completed"
            },
            {
                "id": "19f74c3d-2862-4014-b274-2b8b5e7eabfd",
                "type": "usage",
                "transactionId": "754",
                "date": "2026-01-06T10:52:35.513Z",
                "description": "Deduction for view_bid_participant - Reference: 754",
                "amount": null,
                "muatkoinChange": -50,
                "status": "completed"
            },
            {
                "id": "e1b37798-8099-4ff4-aee2-23b3680ac532",
                "type": "usage",
                "transactionId": "INV/202601/SMP/55368",
                "date": "2026-01-06T07:12:24.435Z",
                "description": "Top Up muatkoin Paket coba sekali lagi di ubah (550 + 50 bonus) - Manual injection - webhook failed",
                "amount": null,
                "muatkoinChange": 600,
                "status": "completed"
            }
        ],
        "pagination": {
            "currentPage": 1,
            "totalPages": 1,
            "totalData": 4,
            "limit": 10
        }
    },
    "Type": "/v1/tm/buyer_subscription/all-transactions?type=usage&page=1&limit=10"
}
```
