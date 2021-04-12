import boto3
from boto3.dynamodb.conditions import Key

from fastapi import FastAPI, APIRouter
from fastapi.encoders import jsonable_encoder

from models import http

router = APIRouter()

DYMO = boto3.resource('dynamodb', endpoint_url="http://localhost:9000")
RGTABLE = DYMO.Table('rgt')
RGTGOLFER = DYMO.Table('rgt-golfers')


@router.get('/golf/golfers')
def get_all_golfers():
    result = RGTGOLFER.scan()
    return result.get('Items', [])

@router.put('/golf/golfers/{name}')
def save_golfer(name: str):
    result = RGTGOLFER.put_item(Item={
        'name': name
    })
    return result

@router.put('/golf/{year}/golfers/{name}')
def save_golfer(year: int, name: str):
    result = RGTGOLFER.put_item(Item={
        'name': name
    })
    return result


@router.put('/golf/{year}/course/{course}/golfers/{golfer}/holes/{hole}')
def save_hole(year: int, course: str, golfer: str, hole: int, golf_hole: http.GolfHole):
    return golf_hole
