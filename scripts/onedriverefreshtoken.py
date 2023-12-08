import json
import requests

url = "https://login.microsoftonline.com/common/oauth2/v2.0/token"
code = ""
clientId = ""
clientSecret = ""
redirectUri = ""

res = requests.post(url=url, data={
    'code': code,
    'client_id': clientId,
    'client_secret': clientSecret,
    'redirect_uri': redirectUri,
    'grant_type': 'authorization_code'
})

j = json.loads(res.text)

print(j)

print("refresh_token is: \n")
print(j["refresh_token"])
