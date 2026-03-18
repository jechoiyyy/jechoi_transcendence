FROM mariadb:11

RUN apt-get update && apt-get install -y mariadb-client

# 초기화 SQL 복사
COPY ./init.sql /docker-entrypoint-initdb.d/