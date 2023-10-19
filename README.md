# created by openorder -- todoappio

Endpoint POST /auth/signup
Content-Type application/json
{
"user": "user",
"password": "password"
}

# create a new account

Endpoint POST /auth/signin
Content-Type application/json
{
"user": "user",
"password": "password"
}

# signin to existing account

Endpoint GET /?signature=signature
Content-Type: application/json

# verify id route (main entry)

Endpoint PUT /list/backup?signature=signature
Content-Type: application/json

{
"user":"host",
"todo":[
{"id":"ID","title":"","checked":false,"day":"October 17","time":"12:20:40 AM"}
]
}

# backup data to cloud

Endpoint GET /list/restore?signature=signature
Content-Type: application/json

# restore data from cloud
