```bash
curl --location 'https://api-az.assetlogistik.com/v1/tm/buyer_subscription/balance' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcnJpZV90bXNoaXBwZXJAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWQiOiI0Nzg3Iiwic2VsbGVyaWQiOm51bGwsImlhdCI6MTc2NzMzNjkxMiwiZXhwIjoxNzY3NDIzMzEyfQ.YczopwqZK3VCof5ftwhcCLccepITC0TyKKosrvTigF8'
```

```json
{
  "Message": {
    "Code": 200,
    "Text": "OK"
  },
  "Data": {
    "currentBalance": 0,
    "totalBalance": 0,
    "currency": "muatkoin"
  },
  "Type": "/v1/tm/buyer_subscription/balance"
}
```
