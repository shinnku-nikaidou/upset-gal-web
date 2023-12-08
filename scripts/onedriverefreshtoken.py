import json
import requests
import urllib3

url = "https://login.microsoftonline.com/common/oauth2/v2.0/token"
code = "0.ASsACloO83GGjkOotRxaJyHyHL5uphDcYIFBlXFZ8eqkOyLCAJ8.AgABAAIAAAAmoFfGtYxvRrNriQdPKIZ-AgDs_wUA9P9WFdm8iHR4JLNRB92kYewQq9yUNF7cuyom2GS6lPYF-pDwUqoQg5bjaglcG_JsLfRb6nkfwIdloCsyt5DXwMZXL3UzR-e5M7gLPtHfkyCA__N1JwCNrZ-250O2SmiZM2fDceUXnHQfwizYZTLAZ1V1UM_DK42TSA1f0FIXcgh4RAxd8xnW3loN6NtUXNS7e2zAkSBP9BRFJHXl3i4ZLeE0qWMyGaZQNVyHBynylhub5_nML6itT6qVKMHQVHT2Jo7i7xKBg6AzWndFOEEuI-h-IQfNMj5wjHsqWwzUa0Z9o7wwEKD_19_1g4WztStxvvwLl-tKr0XjF-YLg88rscWXDeXZc12ppFZqhtlfKSDPq_DM_mYIqeUiJRo1nCBTr8ZwTuG-ZIRYFuAU3hi2lsYLdrrjMR37hGcnLFniYVIdZZJN9FbXoVaxirlrILBxjVdyYx3ONVROGqb6aqj6vcKODAN-qiOkuce9rDFTdCipWoKI38E0gDPqPbjGQmJMMlBPZrpWc-TCNiPt1e5UHDQ6l09J8oxz5A3uHCv8oNfxq-PT_q-Vu5vty2ahJNnieGzp4OKF14unQQQAfYBuPL58GmfJyw_zWuB3lFIGS6olMTKw_hjH4DwLalJ2b57M8ZsJ1rUepsODaLEXTKLJ2Fo53FLc6IW-BWQEg86FsQEqU2qUEg0vwNde2sYVltfB3bGZk3nlBaRiteE1_R4MPGm_TUlZNbKpyYnG"
clientId = "10a66ebe-60dc-4181-9571-59f1eaa43b22"
clientSecret = "fD~8Q~CC1Kpmmm-7uCHrrckvU1BgotQyielyZbQl"
redirectUri = "https://www.shinnku.com/api/onedrive-login"

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
