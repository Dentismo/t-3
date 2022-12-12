import re

from locust import HttpUser, TaskSet, between, task


class User(HttpUser):
    @task
    class sequenceOfTask(TaskSet):
        wait_time = between(1, 5)

    @task
    def homePage(self):
        self.client.get("/")
        self.client.get("http://localhost:8080")

    @task
    def clickCard(self):
        self.client.get("clinic/637e0dbf0e5ac0363e1317ca")

    @task
    def login(self):
            self.client.options("http://localhost:8080/login")
            response = self.client.post("http://localhost:8080/login",json={"username":"bruno123@gmail.com","password":"YWFhYQ=="})
            global token 
            token = re.match("\"Auth_token: (.+?)\"",response.text)[1]
            print(response.text)

    @task
    def dashboardPage(self):
        self.client.get("dashboard/")