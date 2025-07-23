import requests

def get_ip_location(ip: str) -> dict:
    try:
        response = requests.get(
            f"http://ip-api.com/json/{ip}?fields=status,message,country,regionName,city,lat,lon",
            timeout=3
        )
        data = response.json()
        if data['status'] == 'success':
            city = data.get('city', '')
            region = data.get('regionName', '')
            country = data.get('country', '')
            location_name = ", ".join(filter(None, [city, region, country]))
            return {
                "latitude": data.get('lat'),
                "longitude": data.get('lon'),
                "location": location_name
            }
        else:
            print(f"IP location lookup failed for {ip}: {data.get('message')}")
    except Exception as e:
        print(f"Error fetching location for IP {ip}: {e}")
    
    return {
        "latitude": None,
        "longitude": None,
        "location": "Unknown"
    }
