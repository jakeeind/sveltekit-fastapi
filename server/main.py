from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(BaseModel):
    id: Optional[int] = None
    name: str

class CreateItem(BaseModel):
    name: str


ITEMS = [
    {"id": 1, "name": "Item 1"},
]


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items")
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
