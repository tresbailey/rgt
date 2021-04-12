import boto3
from boto3.dynamodb.conditions import Key

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

from endpoints import api_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


DYMO = boto3.resource('dynamodb', endpoint_url="http://localhost:9000")
RGTABLE = DYMO.Table('rgt')
RGTGOLFER = DYMO.Table('rgt-golfers')


@app.get('/golf')
def get_years():
    results = RGTABLE.scan()
    return results.get('Items', [])


app.include_router(api_router)
