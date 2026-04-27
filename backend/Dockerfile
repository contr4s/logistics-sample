FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY Logistics.sln ./
COPY Logistics.Domain/*.csproj ./Logistics.Domain/
COPY Logistics.Application/*.csproj ./Logistics.Application/
COPY Logistics.Infrastructure/*.csproj ./Logistics.Infrastructure/
COPY Logistics.WebApi/*.csproj ./Logistics.WebApi/

RUN dotnet restore

COPY . ./
WORKDIR /src/Logistics.WebApi
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS final
WORKDIR /app

USER $APP_UID

COPY --from=build /app/publish .

EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O - http://localhost:8080/health || exit 1

ENTRYPOINT ["dotnet", "Logistics.WebApi.dll"]