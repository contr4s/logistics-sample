# Logistics Sample Application

Web-приложение для приемки заказа на доставку.

## Технологии
- **Backend:** .NET 9, ASP.NET Core Minimal APIs, Entity Framework Core 9, PostgreSQL, Clean Architecture, CQRS (MediatR), FluentValidation.
- **Frontend:** React 19 (Vite), TypeScript, Material-UI (MUI), Axios, React Router.

## Требования для запуска
- Docker & Docker Compose

## Инструкция по запуску

В корневой папке проекта выполните команду для сборки и запуска всего стека (PostgreSQL, Backend .NET, Frontend React/Nginx):
```bash
docker-compose up -d --build
```

- **Frontend** будет доступен по адресу: http://localhost:5173
- **Backend API** документация доступна по адресу: http://localhost:5082/scalar/v1

### Остановка
```bash
docker-compose down
```
