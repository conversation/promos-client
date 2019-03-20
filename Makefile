.PHONY: clean lint node_modules publish release test watch

node_modules:
	@npm install

test:
	@npx jest

watch:
	@npx jest --watch

lint:
	@npx standard

release: publish

publish:
	@npm publish

clean:
	@rm -rf dist doc node_modules
