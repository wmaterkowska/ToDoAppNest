#!/usr/bin/env bash

set -euo pipefail
which psql > /dev/null || (echoerr "Please ensure that postgres client is in your PATH" && exit 1)

mkdir -p $HOME/docker/volumes/postgres


docker run --rm --name pg-docker -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=todo_db -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql postgres
sleep 3
export PGPASSWORD=postgres
# for sql
# psql -U postgres -d dev -h localhost -f server/orm/schema.sql
# for orm
# psql -U postgres -d dev -h localhost