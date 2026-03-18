COMPOSE = docker compose
COMPOSE_BUILD = $(COMPOSE) --profile build
COMPOSE_PROD = $(COMPOSE) --profile prod
COMPOSE_DEV = $(COMPOSE) --profile dev
DOCKER_DIR = docker/
FILE       = $(DOCKER_DIR)docker-compose.yml

IP_GUESS_UNIX   := $(shell hostname -I 2>/dev/null | awk 'NF{print $$1; exit}')
IP_GUESS_DARWIN := $(shell ipconfig getifaddr en0 2>/dev/null)
IP_DEFAULT      := 127.0.0.1
IP             ?= $(strip $(if $(IP_GUESS_UNIX),$(IP_GUESS_UNIX),$(if $(IP_GUESS_DARWIN),$(IP_GUESS_DARWIN),$(IP_DEFAULT))))

.PHONY: all up down clean fclean re update-env cert build update-dev update-prod

all: dev_up

up: update-env update-prod build
	$(COMPOSE_PROD) -f $(FILE) up

dev_up: update-env update-dev dev_build
	$(COMPOSE_DEV) -f $(FILE) up

build:
	$(COMPOSE_BUILD) -f $(FILE) build client_build --no-cache
	$(COMPOSE_PROD) -f $(FILE) build --no-cache

dev_build:
	$(COMPOSE_DEV) -f $(FILE) build --no-cache

down:
	$(COMPOSE_PROD) -f $(FILE) down

dev_down:
	$(COMPOSE_DEV) -f $(FILE) down

clean:

fclean: clean
	$(COMPOSE_PROD) -f $(FILE) down --volumes --remove-orphans
	@docker container prune -f
	@docker volume prune -f
	@docker network prune -f
	@docker system prune -f
	@docker builder prune -f

dev_fclean: clean
	$(COMPOSE_DEV) -f $(FILE) down --volumes --remove-orphans
	@docker container prune -f
	@docker volume prune -f
	@docker network prune -f
	@docker system prune -f
	@docker builder prune -f

re: dev_fclean all

ENV_FILE = ./docker/.env

update-env:
	@touch $(ENV_FILE)
	@grep -v "^VITE_SERVER_IP=" $(ENV_FILE) > $(ENV_FILE).tmp 2>/dev/null || true
	@mv $(ENV_FILE).tmp $(ENV_FILE)
	@printf "VITE_SERVER_IP=%s\n" "$(IP)" >> $(ENV_FILE)

update-dev:
	@touch $(ENV_FILE)
	@grep -v "^NODE_ENV=" $(ENV_FILE) > $(ENV_FILE).tmp 2>/dev/null || true
	@mv $(ENV_FILE).tmp $(ENV_FILE)
	@printf "NODE_ENV=%s\n" development >> $(ENV_FILE)

update-prod:
	@touch $(ENV_FILE)
	@grep -v "^NODE_ENV=" $(ENV_FILE) > $(ENV_FILE).tmp 2>/dev/null || true
	@mv $(ENV_FILE).tmp $(ENV_FILE)
	@printf "NODE_ENV=%s\n" production >> $(ENV_FILE)