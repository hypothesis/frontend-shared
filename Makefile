.PHONY: default
default: help

.PHONY: help
help:
	@echo "make help              Show this help message"
	@echo "make build             Build the package"
	@echo "make checkformatting   Check code formatting"
	@echo "make clean             Delete development artefacts (cached files etc.)"
	@echo "make dev               Run the pattern library app in a development server"
	@echo "make docker            Build Docker image for the website"
	@echo "make format            Automatically format code"
	@echo "make lint              Run the code linter(s) and print any warnings"
	@echo "make run-docker        Run a Docker container using the image created by \`make docker\`"
	@echo "make sure              Make sure that the formatter, linter, tests, etc all pass"
	@echo "make test              Run the unit tests once"

.PHONY: dev
dev: node_modules/.uptodate
	node_modules/.bin/gulp watch

.PHONY: docker
docker:
	@git archive --format=tar.gz HEAD | docker build -t hypothesis/frontend-shared:latest -

# Run Docker container. Publish to port 5002 on the host to avoid a conflict
# with other Hypothesis projects.
.PHONY: run-docker
run-docker:
	@docker run --rm -p 5002:5001 --name hypothesis-frontend-shared hypothesis/frontend-shared:latest

.PHONY: test
test: node_modules/.uptodate
ifdef ARGS
	yarn test $(ARGS)
else
	yarn test
endif

.PHONY: lint
lint: node_modules/.uptodate
	yarn run lint
	yarn run typecheck

.PHONY: clean
clean:
	rm -f node_modules/.uptodate
	rm -rf lib
	rm -rf build

.PHONY: format
format: node_modules/.uptodate
	yarn run format

.PHONY: checkformatting
checkformatting: node_modules/.uptodate
	yarn run checkformatting

.PHONY: sure
sure: checkformatting lint test

.PHONY: build
build: node_modules/.uptodate
	yarn run build

node_modules/.uptodate: package.json yarn.lock
	yarn install
	yarn playwright install
	@touch $@
