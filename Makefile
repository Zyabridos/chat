# Local-comands

install:
	npm ci

start-frontend:
	cd frontend; npm run dev

start-backend:
	npx start-server -s ./frontend/dist

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/dist
	npm run build --prefix frontend

start:
	npx start-server -s ./frontend/dist

lint:
	npx eslint .

# Docker-comands

docker-build:
	docker build -t my-app .

docker-install:
	docker run --rm -v $(PWD):/app -w /app node:20 npm ci

docker-start:
	docker run -d -p 3000:3000 --name my-app my-app

docker-start-frontend:
	docker run -d -p 5173:5173 --name my-frontend my-frontend

docker-stop:
	docker stop my-app || true
	docker rm my-app || true

docker-clean:
	docker stop my-app || true
	docker rm my-app || true
	docker rmi my-app || true
	docker volume prune -f

docker-lint:
	docker run --rm -v $(PWD):/app -w /app node:20 npx eslint .
