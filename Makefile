include .env
export

.PHONY: run-fe
run-fe:
	-@lsof -ti:${CLIENT_PORT} | xargs kill -9 2>/dev/null || true
	npx nx serve auction-app --port ${CLIENT_PORT} --open

.PHONY: run-be
run-be:
	-@lsof -ti:${API_PORT} | xargs kill -9 2>/dev/null || true
	docker-compose up -d postgres redis
	@echo "Waiting for PostgreSQL to start..."
	@sleep 5
	npx nx serve rest-api --watch

.PHONY: run-be
run-go:
	-@lsof -ti:8080 | xargs kill -9 2>/dev/null || true
	go run ./go-service/cmd/main.go

.PHONY: run-all
run-all:
	-@lsof -ti:${API_PORT} | xargs kill -9 2>/dev/null || true
	-@lsof -ti:${CLIENT_PORT} | xargs kill -9 2>/dev/null || true
	docker-compose up -d postgres redis
	@echo "Waiting for PostgreSQL to start..."
	@sleep 5
	npx nx run-many --target=serve --projects=rest-api,auction-app,go-service --parallel=true

.PHONY: docker-run-fe
docker-run-fe:
	docker-compose up -d frontend

.PHONY: docker-run-be
docker-run-be:
	docker-compose up -d postgres redis backend go-service

.PHONY: docker-run-fe
docker-run-go:
	docker-compose up -d go-service

.PHONY: docker-run-all
docker-run-all:
	docker-compose up -d

.PHONY: build-go
build-go:
	docker-compose build go-service

.PHONY: up-go
up-go:
	docker-compose up -d go-service

.PHONY: restart-go
restart-go:
	docker-compose restart go-service

.PHONY: stop
stop:
	-@lsof -ti:${API_PORT} | xargs kill -9 2>/dev/null || true
	-@lsof -ti:${CLIENT_PORT} | xargs kill -9 2>/dev/null || true
	docker-compose down
