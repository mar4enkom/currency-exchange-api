
## Важливі рішення:
1. Використання BullMQ на базі Redis для надсилання імейлів 1 раз на добу. Перед звичайним cron процесом це дає декілька переваг в нашому випадку: BullMQ хендлить кейс коли декілька інстансів скедюлять одну і ту саму job, зберігає звіт зі статусами виконаних джобів і може відновлювати виконання джобів після збою.
2. При кожному запиті на /rate робити відповідний запит на стороннє API, а не зберігати результати запиту і оновлювати їх раз у певний період. Дані з API приват банку оновлюються кілька разів на день у різний час, а оскільки застосунок має давати **поточні** дані, перевіряти чи не змінилося значення, яке повертає API треба дуже часто. І з моїм рішенням, запит виконуватиметься довше і буде більше залежати від стороннього API, проте юзер матиме up-to-date значення.
3. Створення background періодичну job, яка отримує курс і потім породжує окрему job для кожного email в базі.
4. Окремим мікросервісом підіймаю дашборду для моніторингу BullMQ jobs, що сильно облегшило процес дебагінгу.
5. Налаштування тайм зони для докер контейнеру.

![bullmq screenshot](/bullmq-ui.png)

## Tech Stack

**Runtime environment:** Node.js

**Web Framework:** Express

**Message Queue:** BullMQ

**Database:** MongoDB

**Database ORM:** mongoose

**Email transporter:** emailjs

**Validation:** Zod

## Installation

1. Clone repository
```bash
git clone https://github.com/your-repo/currency-exchange-server.git
cd currency-exchange-server
```
2. Create a .env file in the server directory.
   **!!! I use my own mailer server. If you don't have your own, chat me to [telegram](t.me/mar4enkom), I'll give you credentials ASAP.**
```
MODE=development
PORT=8000
MONGODB_URI=mongodb://admin:qweasdzxc0987@mongo-db:27017/currency-exchange?authSource=admin

MAILER_HOST=your host
MAILER_PORT=465
MAILER_USER=your mailer user
MAILER_PASSWORD=your password

REDIS_HOST=redis
REDIS_PORT=6379

PRIVAT_BANK_API=https://api.privatbank.ua/p24api/pubinfo
```
3. Build and start the services:
```bash 
docker-compose up --build
```
## Accessing the Application
- Server: http://localhost:8000
- MongoDB: Accessible via mongodb://localhost:27017
- Redis: Accessible via redis://localhost:6379
- Bull Board: http://localhost:3000
    