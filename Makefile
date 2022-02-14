.PHONY: clean dist lint node_modules parser publish release test watch

node_modules:
	@npm install

parser:
	@npx jison src/parser.jison -o src/parser.js -m commonjs

dist:
	@npm run build

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
