# BACKEND COFFEE SHOP HARD CODE
## Modules included :
|           |        |             |         |
| --------- | ------ | ----------- | ------- |
| ExpressJS | MySQL2 | Morgan      | Lodash  |
| JWT       | bcrypt | Body Parser | CORS    |
| DotENV    | Multer | Redis       | Mailjet |

 ## Dev Modules :
- Nodemon

---
# How to use?
1. Run `npm install` to install library / modules required
2. Import database (coffee_shop_db.sql to your SQL DBMS)
3. Set ".env" file in root :
    - `PORT`        : fill for set the API running port
    - `db_host`     : fill with HOSTNAME in your  database configuration
    - `db_user`     : fill with USERNAME in your database configuration
    - `db_password` : fill with PASSWORD in your database configuration (Or leave it null if your database haven't password)
    - `db_name`   : fill with the NAME OF DATABASE (Or leave it filled with `coffee_shop_db.sql` if you isn't rename the database)
    - `JWT_SECRET`   : fill with the unique value due to signature verifier on JWT
    - `token_mail1`  : fill with token from your mailjet username (https://www.mailjet.com/)
    - `token_mail2`  : fill with token from your mailjet password (https://www.mailjet.com/)
    - `email_from`   : fill with your email in mailjet
4. Run redis :
    - `redis-server` : to run redis server (https://redis.io/)
5. Run with :
    - `npm run start`

---

# Documantation :
- Postman : https://documenter.getpostman.com/view/13713483/TWDTLJVe

# Frontend
You can see at [frontend](https://github.com/RZID/Coffee-Shop_HardCode.git)
