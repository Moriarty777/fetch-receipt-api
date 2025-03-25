# Fetch Receipt API

This is a backend receipt API for the Fetch assessment test. It processes receipt data and calculates reward points based on specific rules.

## Running the Application with Docker

To build the Docker image from the `Dockerfile` in this repository, run:

```
docker build -t fetch-receipt-api .
```

Once the image is built, start the container with:

```
docker run -p 3000:3000 fetch-receipt-api
```

This will run the API on port 3000.

# Example API Usage

You can test the API using curl.

## Process a Receipt

```
curl -X POST http://localhost:3000/receipts/process \
 -H "Content-Type: application/json" \
 -d '{
   "retailer": "M&M Corner Market",
   "purchaseDate": "2022-03-20",
   "purchaseTime": "14:33",
   "items": [
     {"shortDescription": "Gatorade", "price": "2.25"},
     {"shortDescription": "Gatorade", "price": "2.25"},
     {"shortDescription": "Gatorade", "price": "2.25"},
     {"shortDescription": "Gatorade", "price": "2.25"}
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
