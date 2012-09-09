
build: index.js components
	@component build

components:
	@component install

test/out.js: index.js
	component build package.json test/out

clean:
	rm -fr build components

.PHONY: clean