```bash
curl --location --request GET "https://api-az.assetlogistik.com/v1/tm/buyer_subscription/purchase-history/9a61a632-24d1-4814-85eb-a6870cf62057" \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcnJpZV90bXNoaXBwZXJAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWQiOiI0Nzg3Iiwic2VsbGVyaWQiOm51bGwsImlhdCI6MTc2NzMzNjkxMiwiZXhwIjoxNzY3NDIzMzEyfQ.YczopwqZK3VCof5ftwhcCLccepITC0TyKKosrvTigF8"
```

```json
{
  "Message": {
    "Code": 200,
    "Text": "OK"
  },
  "Data": {
    "id": "9a61a632-24d1-4814-85eb-a6870cf62057",
    "transactionId": "INV/202601/SMP/98339",
    "transactionDate": "2026-01-02T10:29:38.591Z",
    "packageName": "coba sekali lagi di ubah",
    "packageId": "1e45854b-c0e6-4d92-b079-48ec60b46723",
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
    },
    "additionalMuatkoin": "500 muatkoin",
    "price": 1000,
    "currency": "IDR",
    "status": "pending",
    "statusLabel": "Pending",
    "paymentMethod": {
      "id": "d2aa95f5-6b8e-4272-b922-624234c443a3",
      "name": "BCA Virtual Account",
      "code": "bca",
      "icon": "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740281046.webp",
      "channel": "VA",
      "fee": "4000.00",
      "feeUnit": "currency"
    },
    "paymentDate": null,
    "expirationDate": "2026-01-03T10:29:38.590Z",
    "createdAt": "2026-01-02T10:29:38.591Z",
    "updatedAt": "2026-01-02T10:29:38.592Z",
    "payment": {
      "id": "501769ac-d6f6-41e7-bf3a-2772f62f5798",
      "paymentDate": null,
      "paymentStatus": "pending",
      "paymentStatusLabel": "Pending",
      "expiredAt": null,
      "vaNumber": "80611089876543217",
      "snapToken": null,
      "snapUrl": null,
      "qrisImageUrl": null,
      "qrisData": null,
      "gopayData": null,
      "alfamartPaymentCode": null,
      "indomaretPaymentCode": null,
      "akulakuRedirectUrl": null,
      "kredivoRedirectUrl": null
    }
  },
  "Type": "/v1/tm/buyer_subscription/purchase-history/9a61a632-24d1-4814-85eb-a6870cf62057"
}
```
