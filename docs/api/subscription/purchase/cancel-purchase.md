```bash
curl --location --request POST "https://apitm-az.assetlogistik.com/v1/tm/buyer_subscription/purchase/cancel" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyaWRheWFyc0BnbWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWQiOiIyODgzIiwic2VsbGVyaWQiOiJmMmQ4NjFkNy1mN2VjLTQ4NjctOGMyNC04OWZkM2U5YTZlOTYiLCJpYXQiOjE3NjgxODgzMDMsImV4cCI6MTc2ODI3NDcwM30.ru38EVxL4mopdc5pVtCwQoCey6M4DAIig3fbwIMiXqs" \
--header "Cookie: U_J=EOsXONbRkRU9X33FUIvaJk0QKFBPAyxn5njvNaMjsQlxeNG3oJFZ9bZGoS3k6lQ2sipLUzPspyNFhd63dNO14fYxFfHgYy4WOZW7" \
--data "{
	\"purchaseId\": \"4c231de9-ebac-4de1-9f50-3498be4e0e60\",
	\"cancelReason\": \"Tidak jadi beli\"
}"
```

```json
{
  "Message": {
    "Code": 200,
    "Text": "OK"
  },
  "Data": {
    "success": true,
    "message": "Transaksi berhasil dibatalkan",
    "transactionId": "INV/202601/SMP/61700",
    "purchaseId": "4c231de9-ebac-4de1-9f50-3498be4e0e60",
    "status": "cancelled",
    "cancelReason": "Tidak jadi beli"
  },
  "Type": "/v1/tm/buyer_subscription/purchase/cancel"
}
```
