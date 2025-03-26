# Fetch Receipt API

This is a backend receipt API for the Fetch assessment test. It processes receipt data and calculates reward points based on specific rules.

Link: https://github.com/fetch-rewards/receipt-processor-challenge/tree/main

### How to Build and Run the Docker Image

1. Clone the repository:

    ```bash
    git clone <repo-url>
    ```

2. Change to the project directory:

    ```bash
    cd fetch-receipt-api
    ```

3. Build the Docker image:

    ```bash
    docker build -t fetch-receipt-api .
    ```

4. Run the Docker container:

    ```bash
    docker run -p 3000:3000 fetch-receipt-api
    ```

This will start the API server and make it accessible on `http://localhost:3000`.

### Example API Call Using cURL:

To test the API, you can use the following `curl` command:

```bash
curl -X POST http://localhost:3000/receipts/process \
 -H "Content-Type: application/json" \
 -d '{
"retailer": "M&M Corner Market",
"purchaseDate": "2022-03-20",
"purchaseTime": "14:33",
"items": [
{
"shortDescription": "Gatorade",
"price": "2.25"
},{
"shortDescription": "Gatorade",
"price": "2.25"
},{
"shortDescription": "Gatorade",
"price": "2.25"
},{
"shortDescription": "Gatorade",
"price": "2.25"
}
],
"total": "9.00"
}'
```

This will return a JSON response with an id for the processed receipt.

## Get Points for a Receipt

```
curl -X GET http://localhost:3000/receipts/{id}/points
```

Replace {id} with the actual receipt ID returned from the first request.
