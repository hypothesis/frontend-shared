.PHONY: default
default: help

.PHONY: help
help:
	@echo "make help              Show this help message"
	@echo "make dev               Run the pattern library app in a development server"
	@echo "make build             Build the package"
	@echo "make lint              Run the code linter(s) and print any warnings"
	@echo "make checkformatting   Check code formatting"
	@echo "make format            Automatically format code"
	@echo "make test              Run the unit tests once"
	@echo "make sure              Make sure that the formatter, linter, tests, etc all pass"
	@echo "make clean             Delete development artefacts (cached files, "
	@echo "                       dependencies, etc)"

.PHONY: dev
dev: node_modules/.uptodate
	node_modules/.bin/gulp watch

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
	rm -rf lib lib-cjs
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
	@touch $@
