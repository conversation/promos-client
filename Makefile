.PHONY: clean dist lint node_modules publish release test watch

node_modules:
	@npm install

dist:
	@npx babel --out-dir dist src

test:
	@npx jest

watch:
	@npx jest --watch

lint:
	@npx standard

release: dist publish

publish:
	@npm publish

clean:
	@rm -rf dist node_modules
