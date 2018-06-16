clean: 
	npm run clean

local:
	docker-compose up -d && npm run dev

lint:
	npm run lint

test: 
	docker-compose \
		-f docker-compose.test.yml \
		run --rm \
		test
	docker-compose \
		down
