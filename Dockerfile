FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

COPY ./api /api

WORKDIR /api

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]

