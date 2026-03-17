FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["StoreAPI/StoreAPI.csproj", "StoreAPI/"]
COPY ["BusinessLogicLayer/BusinessLogicLayer.csproj", "BusinessLogicLayer/"]
COPY ["DataAccessLayer/DataAccessLayer.csproj", "DataAccessLayer/"]

RUN dotnet restore "StoreAPI/StoreAPI.csproj"

COPY . .
RUN dotnet publish "StoreAPI/StoreAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "StoreAPI.dll"]