.PHONY: clean dist lint node_modules parser publish release test watch

node_modules:
	@npm install

parser:
	@npx jison src/parser.jison -o src/parser.js -m commonjs

dist:
	@mkdir -p dist/cjs dist/esm
	@npx babel --delete-dir-on-start --copy-files --out-dir dist/cjs src
	@npx babel --delete-dir-on-start --copy-files --env-name esm --out-dir dist/esm src

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
