# instagram-data

This is a lambda function that returns all public datas from a user in instagram

You can see this lambda into:

https://2vb02priyk.execute-api.us-east-1.amazonaws.com/prod/{username}

this route will return all public user data, the same datas from https://instagram.com/{username}?__a=1 but the diference between the instagram route and this lambda is: this is lambda function skip all errors, like: cors, require login and etc...

This lambda function can be slow to return.
