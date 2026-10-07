import os
import sys
import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(_file_))))

from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True

    with app.test_client() as client:
        yield client


def test_home(client):
    response = client.get("/")
    assert response.status_code == 200

    data = response.get_json()
    assert data["status"] == "success"


def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200

    data = response.get_json()
    assert data["status"] == "healthy"


def test_process(client):
    response = client.post(
        "/process",
        json={"name": "Aseem"}
    )

    assert response.status_code == 200

    data = response.get_json()
    assert data["status"] == "success"
    assert data["message"] == "Hello Aseem!"
