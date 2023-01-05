import random
import re
from json import JSONDecodeError

from locust import HttpUser, TaskSet, between, task


class User(HttpUser):
    @task
    class sequenceOfTask(TaskSet):
        wait_time = between(1, 5)

    @task
    def homePage(self):
        id = str(random.randint(1, 100))
        self.client.get("/request/clinics/" + id)

    @task
    def clickCard(self):
        """Test getting one specific clinic"""
        response = self.client.post("/request/clinic/637e0dbf0e5ac0363e1317ca", json={"_id":"637e0dbf0e5ac0363e1317ca"})
        print(response.text)

    @task
    def login(self):
        id = str(random.randint(1, 100))
        response = self.client.post("/request/login/" + id, json={"email":"matteo22@gmail.com","password":"matteo22"})
        print(response.text)
        try:
            if ("token" not in response.json()):
                response.failure("Login failed")
        except JSONDecodeError:
            response.failure("Response could not be decoded as JSON")
        
