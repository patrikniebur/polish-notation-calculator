### How to run

_(assumes node and npm installed)_

- `npm install`
- `npm start` - starts the project
- `npm test` - tests

#### Notes

I've created a library inside `src/ts/library/` folder for parsing the notation and doing the calculation. Library contains parser which creates AST of the notation and then simple compute function which does the calculation out of AST. The advantage is that AST can be further parsed into calculation string using infix notation for adding infix notation previews in the future etc...

I chose TDD as my preferred approach, which helped to test various valid and invalid scenarios for parsing and calculations.  
Most of my time was spent on creating working parser, from then on doing the calculation was simple and then I added simple UI so it can be easily tested with user input.
