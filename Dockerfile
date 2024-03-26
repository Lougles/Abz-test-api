# Устанавливаем базовый образ Node.js
FROM node:14

# Устанавливаем рабочую директорию в контейнере
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Компилируем приложение
RUN npm run build

# Открываем порт 3000
EXPOSE 3001

# Запускаем приложение
CMD ["node", "dist/src/main"]

