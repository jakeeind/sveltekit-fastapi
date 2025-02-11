from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.routing import APIRoute
from pydantic import BaseModel, Field
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware


class ErrorHandlingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except HTTPException as exc:
            return JSONResponse(
                status_code=exc.status_code,
                content={"detail": [{"message": exc.detail}]},
            )
        except Exception as exc:
            return JSONResponse(
                status_code=500,
                content={"detail": [{"message": f"Internal Server Error: {exc}"}]},
            )


app = FastAPI()

app.add_middleware(ErrorHandlingMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ErrorResponseModel(BaseModel):
    errors: list[dict[str, str]]


class Item(BaseModel):
    id: Optional[int] = None
    name: str


class CreateItem(BaseModel):
    name: str = Field(min_length=3)

    @classmethod
    def validate_name(cls, name: str):
        if len(name) < 3:
            raise ValueError("Name must be at least 3 characters long")
        return name

    @classmethod
    def __get_validators__(cls):
        yield cls.validate_name


ITEMS = [
    {"id": 1, "name": "Item 1"},
]


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items", responses={400: {"model": ErrorResponseModel}}, name="get_items")
def read_items():
    if (ITEMS is None) or (len(ITEMS) == 0):
        raise HTTPException(status_code=404, detail="Items not found")
    return ITEMS


@app.get("/items/{item_id}")
def read_item(item_id: int) -> Item:
    item = next((item for item in ITEMS if item["id"] == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.post("/items")
def insert_item(item: CreateItem):
    id = len(ITEMS) + 1
    result = {"id": id, "name": item.name}
    ITEMS.append(result)
    return result


def use_route_names_as_operation_ids(app: FastAPI) -> None:
    """
    Simplify operation IDs so that generated API clients have simpler function
    names.

    Should be called only after all routes have been added.
    """
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name  # in this case, 'read_items'


use_route_names_as_operation_ids(app)
