
test/out.js: index.js
	component build package.json test/out

clean:
	rm -f test/out.*

.PHONY: clean