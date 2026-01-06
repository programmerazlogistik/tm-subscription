```bash
curl --location --request POST "https://api-az.assetlogistik.com/v1/tm/buyer_subscription/purchase" \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcnJpZV90bXNoaXBwZXJAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWQiOiI0Nzg3Iiwic2VsbGVyaWQiOm51bGwsImlhdCI6MTc2NzMzNjkxMiwiZXhwIjoxNzY3NDIzMzEyfQ.YczopwqZK3VCof5ftwhcCLccepITC0TyKKosrvTigF8" \
--header "Content-Type: application/json" \
--data "{
  \"packageId\": \"package-uuid-here\",
  \"paymentMethodId\": \"payment-method-uuid-here\"
}"
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
    "packageId": "1e45854b-c0e6-4d92-b079-48ec60b46723",
    "packageName": "coba sekali lagi di ubah",
    "price": 1000,
    "adminFee": 1000,
    "totalPrice": 2000,
    "status": "pending",
    "paymentId": "501769ac-d6f6-41e7-bf3a-2772f62f5798",
    "paymentUrl": null,
    "snapToken": null,
    "vaNumber": "80611089876543217",
    "qrImage": null,
    "expiresAt": "2026-01-03T10:29:38.677Z",
    "message": "Silakan lakukan pembayaran untuk menyelesaikan transaksi"
  },
  "Type": "/v1/tm/buyer_subscription/purchase"
}
```
