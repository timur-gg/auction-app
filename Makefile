include .env
export

.PHONY: run-fe
run-fe:
	-@lsof -ti:${CLIENT_PORT} | xargs kill -9 2>/dev/null || true
	npx nx serve auction-app --port ${CLIENT_PORT} --open

.PHONY: run-be
run-be:
	@lsof -ti:${API_PORT} | xargs -r kill -9 2>/dev/null || true
	docker-compose up -d postgres redis s3rver

	@until docker-compose exec -T postgres pg_isready -h localhost -q 2>/dev/null; do \
		echo "Waiting for Postgres..."; sleep 1; \
	done

	@echo "All Docker containers are running."
	npx nx serve rest-api --watch


stop:
	-@lsof -ti:${API_PORT} | xargs kill -9 2>/dev/null || true
	-@lsof -ti:${CLIENT_PORT} | xargs kill -9 2>/dev/null || true
	docker-compose down
