```bash
curl --location --request GET "https://apitm-az.assetlogistik.com/v1/tm/buyer_subscription/usage-history?period=all&page=1&limit=10" \
--header "user-agent: Dart/3.8 (dart:io)" \
--header "accept-encoding: gzip" \
--header "content-length: 0" \
--header "host: apitm-az.assetlogistik.com" \
--header "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyaWRheWFyc0BnbWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWQiOiIyODgzIiwic2VsbGVyaWQiOiJmMmQ4NjFkNy1mN2VjLTQ4NjctOGMyNC04OWZkM2U5YTZlOTYiLCJpYXQiOjE3NjgxODgzMDMsImV4cCI6MTc2ODI3NDcwM30.ru38EVxL4mopdc5pVtCwQoCey6M4DAIig3fbwIMiXqs" \
--header "content-type: application/json" \
--header "loginas: buyer" \
--header "platform: mobile" \
--header "Cookie: U_J=EOsXONbRkRU9X33FUIvaJk0QKFBPAyxn5njvNaMjsQlxeNG3oJFZ9bZGoS3k6lQ2sipLUzPspyNFhd63dNO14fYxFfHgYy4WOZW7"
```

```json
{
  "Message": {
    "Code": 200,
    "Text": "OK"
  },
  "Data": {
    "usageHistory": [
      {
        "id": "7b8a8822-09d9-4ac2-ab6a-d5291458ac58",
        "usageDate": "2026-01-12T07:52:52.323Z",
        "userModule": "Transporter",
        "purchaseId": "91d69539-b37d-4150-ad6b-35fd92981cf3",
        "transactionId": "INV/202601/SMP/55368",
        "moduleType": "transporter",
        "usageType": "view_bid_detail_participate",
        "reference": "752",
        "description": "Deduction for view_bid_detail_participate - Reference: 752",
        "opponentCompanyName": "Transporter Jerrie",
        "muatkoinAmount": -100,
        "isPositive": false,
        "packageName": "coba sekali lagi di ubah",
        "packageId": "1e45854b-c0e6-4d92-b079-48ec60b46723"
      },
      {
        "id": "feabac0c-a3bf-4bea-be95-630ea45ba569",
        "usageDate": "2026-01-12T07:41:03.733Z",
        "userModule": "Top Up muatkoin",
        "purchaseId": "4f5dabe0-9ba3-4ce0-8b71-13873f97c99d",
        "transactionId": "INV/202601/SMP/97024",
        "moduleType": "purchase",
        "usageType": "top_up",
        "reference": "INV/202601/SMP/97024",
        "description": "Top Up muatkoin Paket Platinum",
        "opponentCompanyName": null,
        "muatkoinAmount": 500,
        "isPositive": true,
        "packageName": "Platinum",
        "packageId": "6476acbf-56f3-45af-808f-40140f6797fa"
      },
      {
        "id": "d575a7e0-6c89-4516-8ec9-1ed03d9d0fed",
        "usageDate": "2026-01-12T07:38:14.848Z",
        "userModule": "Transporter",
        "purchaseId": "91d69539-b37d-4150-ad6b-35fd92981cf3",
        "transactionId": "INV/202601/SMP/55368",
        "moduleType": "transporter",
        "usageType": "view_bid_detail_participate",
        "reference": "752",
        "description": "Deduction for view_bid_detail_participate - Reference: 752",
        "opponentCompanyName": "Transporter Jerrie",
        "muatkoinAmount": -100,
        "isPositive": false,
        "packageName": "coba sekali lagi di ubah",
        "packageId": "1e45854b-c0e6-4d92-b079-48ec60b46723"
      },
      {
        "id": "a47db88c-9ab2-447e-a7a7-c61fcba12ecb",
        "usageDate": "2026-01-10T09:19:07.492Z",
        "userModule": "Top Up muatkoin",
        "purchaseId": null,
        "transactionId": null,
        "moduleType": "purchase",
        "usageType": "top_up",
        "reference": "INV/202601/SMP/75646",
        "description": "Top Up muatkoin Paket 123123 - Manual injection - webhook failed",
        "opponentCompanyName": null,
        "muatkoinAmount": 123,
        "isPositive": true,
        "packageName": "123123",
        "packageId": "5000d583-7fa2-4672-ae53-b7a20f4436a8"
      },
      {
        "id": "635b9965-ed9b-4a78-99f7-2bdd35d8ca99",
        "usageDate": "2026-01-06T15:23:35.092Z",
        "userModule": "Shipper",
        "purchaseId": "91d69539-b37d-4150-ad6b-35fd92981cf3",
        "transactionId": "INV/202601/SMP/55368",
        "moduleType": "shipper",
        "usageType": "view_bid_participant",
        "reference": "754",
        "description": "Deduction for view_bid_participant - Reference: 754",
        "opponentCompanyName": "XXX",
        "muatkoinAmount": -50,
        "isPositive": false,
        "packageName": "coba sekali lagi di ubah",
        "packageId": "1e45854b-c0e6-4d92-b079-48ec60b46723"
      },
      {
        "id": "446c6b52-d6e4-4dd7-a925-f23e2c9ac2d3",
        "usageDate": "2026-01-06T10:54:42.664Z",
        "userModule": "Transporter",
        "purchaseId": "91d69539-b37d-4150-ad6b-35fd92981cf3",
        "transactionId": "INV/202601/SMP/55368",
        "moduleType": "transporter",
        "usageType": "view_bid_detail_participate",
        "reference": "754",
        "description": "Deduction for view_bid_detail_participate - Reference: 754",
        "opponentCompanyName": "XXX",
        "muatkoinAmount": -100,
        "isPositive": false,
        "packageName": "coba sekali lagi di ubah",
        "packageId": "1e45854b-c0e6-4d92-b079-48ec60b46723"
      },
      {
        "id": "19f74c3d-2862-4014-b274-2b8b5e7eabfd",
        "usageDate": "2026-01-06T10:52:35.513Z",
        "userModule": "Shipper",
        "purchaseId": "91d69539-b37d-4150-ad6b-35fd92981cf3",
        "transactionId": "INV/202601/SMP/55368",
        "moduleType": "shipper",
        "usageType": "view_bid_participant",
        "reference": "754",
        "description": "Deduction for view_bid_participant - Reference: 754",
        "opponentCompanyName": "XXX",
        "muatkoinAmount": -50,
        "isPositive": false,
        "packageName": "coba sekali lagi di ubah",
        "packageId": "1e45854b-c0e6-4d92-b079-48ec60b46723"
      },
      {
        "id": "e1b37798-8099-4ff4-aee2-23b3680ac532",
        "usageDate": "2026-01-06T07:12:24.435Z",
        "userModule": "Top Up muatkoin",
        "purchaseId": null,
        "transactionId": null,
        "moduleType": "purchase",
        "usageType": "top_up",
        "reference": "INV/202601/SMP/55368",
        "description": "Top Up muatkoin Paket coba sekali lagi di ubah (550 + 50 bonus) - Manual injection - webhook failed",
        "opponentCompanyName": null,
        "muatkoinAmount": 600,
        "isPositive": true,
        "packageName": "coba sekali lagi di ubah",
        "packageId": "1e45854b-c0e6-4d92-b079-48ec60b46723"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalData": 8,
      "limit": 10,
      "from": 1,
      "to": 8
    },
    "filters": {
      "search": null,
      "period": "all",
      "startDate": null,
      "endDate": null,
      "usageType": null
    }
  },
  "Type": "/v1/tm/buyer_subscription/usage-history?period=all&page=1&limit=10"
}
```
