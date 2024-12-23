install: 
		npm ci

start-frontend:
		cd frontend; npm run dev

start-backend:
		cd frontend; npx start-server

develop:
		make start-backend & make start-frontend

build:
		rm -rf frontend/dist
		npm run build --prefix frontend