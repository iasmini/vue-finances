build:
	docker-compose build api

restart: stop run

run:
	docker-compose up -d

stop:
	docker-compose stop

shellf:
	docker-compose run api bash

shellb:
	docker-compose run api bash

up:
	docker-compose up
