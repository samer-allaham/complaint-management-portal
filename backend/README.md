# Complaint Management Portal


## Overview  
Backend for the Complaint Management Portal, using ElephantSQL as a DataBase and Docker container
---

## Paths
- /api/tasks
- /api/auth/user
- /api/auth/login
- /api/auth/register
- /api/auth/logout

## Dependencies  
python = "3.9"
asgiref=="^3.4.1"
Django=="^3.2.5"
django-cors-headers=="^3.7.0"
django-environ=="^0.4.5"
django-samesite-none=="^0.0.3"
djangorestframework=="^3.12.4"
gunicorn=="^20.1.0"
psycopg2-binary=="^2.9.1"
PyJWT=="^2.1.0"
pytz=="^2021.1"
sqlparse=="^0.4.1"
whitenoise=="^5.3.0"

---

## Authors  
- Software Developer: Samer Allaham
  - [Official Github](https://github.com/samer-allaham)   

---

## License  
This project is under the MIT License.

---

## Version History  
- 1.0.0

## enviroment variables
- ALLOWED_HOSTS
- DATABASE_HOST
- DATABASE_NAME
- DATABASE_PASSWORD
- DATABASE_PORT
- DATABASE_USER
- DEBUG
- ENGINE
- PROJECT_PATH
- SECRET_KEY

# Deployed links
- [Backend](https://cmpbackend.herokuapp.com/)