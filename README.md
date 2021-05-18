# iBudget

Web app to track income, expenses and analyze spending with responsive design and a backend to provide authentication and persistence.

* Live demo: https://ibudgetapp.netlify.app

Example account 
* user: test@test.com 
* password: test

## Frontend
#### Used frameworks/libs:
- React.js (hooks)
- Rematch (Redux)
- React Router
- Tailwind CSS
- styled-components, twin.macro, Framer Motion
- ant-design charts
- Treact

#### Tests/Documentation:
- wip

## Backend
#### Used frameworks/libs:
- Node.js
- Express.js
- MySQL
- Passport (auth)
- bcrypt
- Joi (data validation)

#### Tests/Documentation:
- API documentation (Postman): https://documenter.getpostman.com/view/13863838/TzCV45Ku

## Configuracion/Deployment
#### Frontend:
- Modify API_DEV_BASE_URL and API_PROD_BASE_URL in /src/lib/Config.js

#### Backend:
- Set the required environment variables:
```DB_HOST = localhost
DB_PORT = 3306
DB_USER = <user>
DB_PASS = <pass>
DB_DATABASE = ibudget
SESSION_SECRET = <session secret>
SESSION_NAME = <session name>
```

- Edit cors policy URL at src/lib/config.js
- Execute sql script at /backend/database.sql

## Pending development
- XSRF protection (!) or JWT implementation
- API rate limit
- i18next translation files
- Add social auth and forgot password
- Unit tests & stress test
- Profiling
- Optimize bundle size
- More features

## Screenshots
![1](https://user-images.githubusercontent.com/23263273/115187022-09476580-a0b9-11eb-876a-cf4a2d724641.png)
![2](https://user-images.githubusercontent.com/23263273/115187027-09dffc00-a0b9-11eb-9ebe-df631b6d879d.png)
![3](https://user-images.githubusercontent.com/23263273/115187032-0a789280-a0b9-11eb-8348-eea8344a3676.png)
![4](https://user-images.githubusercontent.com/23263273/115187035-0ba9bf80-a0b9-11eb-92de-13f9ffaaab13.png)
![5](https://user-images.githubusercontent.com/23263273/115187038-0ba9bf80-a0b9-11eb-8cc7-3e762516e539.png)
![6](https://user-images.githubusercontent.com/23263273/115187041-0c425600-a0b9-11eb-8353-3452479630f4.png)

Alkemy
