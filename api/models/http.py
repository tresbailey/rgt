from datetime import date
from pydantic import BaseModel
from typing import Optional, List


class Achievement(BaseModel):
    name: str
    description: str
    value: int
    can_bogie_bonus: bool
    can_par_bonus: bool

class StrokeCount(BaseModel):
    name: str
    description: str
    value: int
    can_bonus: bool

class GolfHole(BaseModel):
    achievements:  List[Achievement]
    strokes: StrokeCount

class Golfer(BaseModel):
    name: str

class Course(BaseModel):
    name: str

class Round(BaseModel):
    golfer: Golfer
    holes: List[GolfHole]
    total_money: int
    year: int

class TeamScore(BaseModel):
    golfers: List[Golfer]
    total_dots: int

class TeamRound(BaseModel):
    team_one: TeamScore
    team_two: TeamScore

class CourseVisit(BaseModel):
    year: int
    course: str
    visit_date: date
    team_round: Optional[TeamRound] = None
    golfer_rounds: Optional[List[Round]] = []


