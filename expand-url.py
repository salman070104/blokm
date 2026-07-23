import urllib.request
import urllib.parse
import re

url = "https://maps.app.goo.gl/Bb4P6CTxZ6FZAJbg7"
req = urllib.request.Request(url, method='HEAD')
try:
    response = urllib.request.urlopen(req)
    final_url = response.geturl()
    print("Final URL:", final_url)
except Exception as e:
    print("Error:", e)

