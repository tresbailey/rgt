import boto3
from boto3.dynamodb.conditions import Key

from fastapi import FastAPI, APIRouter
from fastapi.encoders import jsonable_encoder

from models import http

router = APIRouter()

DYMO = boto3.resource('dynamodb', endpoint_url="http://localhost:9000")
RGTABLE = DYMO.Table('rgt')
RGTGOLFER = DYMO.Table('rgt-golfers')

@router.get('/golf/{year}', response_model=http.CourseVisit)
def get_rounds(year: int):
    result = RGTABLE.query(
        KeyConditionExpression=Key('year').eq(year))
    return result['Items']


@router.get('/golf/{year}/courses')
def list_courses(year: int):
    result = []
    for course in RGTABLE.query(
            KeyConditionExpression=Key('year').eq(year))['Items']:
        result.append(course['course'])
    return result


@router.get('/golf/{year}/courses/{course}')
def get_course_details(year: int, course: str):
    result = RGTABLE.query(
        KeyConditionExpression=Key('year').eq(year) & Key('course').eq(course))
    return result['Items'][0]


@router.put('/golf/{year}')
def save_year(year: int, visit: http.CourseVisit):
    result = RGTABLE.put_item(Item={
        "year": year,
        "course": visit.course
    })
    return result


@router.put('/golf/{year}/courses/{course}')
def save_course(year: int, course: str, visit: http.CourseVisit):
    result = RGTABLE.put_item(Item=jsonable_encoder(visit))
    return result

