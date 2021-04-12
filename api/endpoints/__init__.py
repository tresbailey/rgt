from fastapi import APIRouter

from endpoints import course, golfer

api_router = APIRouter()


api_router.include_router(golfer.router, tags=['golfer'])
api_router.include_router(course.router, tags=['course'])
