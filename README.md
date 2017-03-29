## Set Up

npm install

check out env.schema and create a .env file with your values from [IBM > Bluemix > Watson](https://console.ng.bluemix.net/catalog/services/tone-analyzer?env_id=ibm:yp:us-south)

https://console.ng.bluemix.net/catalog/services/tone-analyzer?env_id=ibm:yp:us-south

npm start

and checkout [localhost:3000](http://localhost:3000)

## Test Post

curl -H "Content-Type: application/json" -X POST -d '{"text":"Why are you here and why are we doing this?"}' http://localhost:3000/v1/analyzeThis

