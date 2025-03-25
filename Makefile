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
	docker build -t chat-frontend .

docker-start:
	docker run -d -p 3000:3000 --name chat-frontend chat-frontend

docker-stop:
	docker stop chat-frontend || true
	docker rm chat-frontend || true

docker-clean:
	docker stop chat-frontend
	docker rm chat-frontend
	docker rmi chat-frontend
	docker volume prune -f
