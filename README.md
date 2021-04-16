# iBudget

Web app to track income, expenses and analyze spending with a backend to provide authentication and persistence.

* Live demo: https://ibudgetapp.netlify.app
* Example account: test@test.com - test

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

## Backend configuration
- Set the required environment variables:
```DB_HOST = localhost
DB_PORT = 3306
DB_USER = <user>
DB_PASS = <pass>
DB_DATABASE = ibudget
SESSION_SECRET = <session secret>
SESSION_NAME = <session name>
```

- Edit cors policy url at src/lib/config.js
- Execute sql script at /backend/database.sql

## Pending development
- XSRF protection (!)
- API rate limit
- i18next translation files
- Add social auth and forgot password
- Unit tests & stress test
- Profiling
- Optimize bundle size
- More features

Alkemy
