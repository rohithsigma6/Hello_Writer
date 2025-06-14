# Project setup

Step 1: cd into packages/screenplay-editor
Step 2: run npm install
Step 3: run npm build
Step 4: cd into apps/script-writer
Step 5: npm install
Step 6: npm run dev

# Common issues:

1. Failed to resolve entry for package `@screenplay-ink/editor`.

Remove all node_modules from: 
- apps/script-writer,
- ⁠packages/screenplay-editor
- Remove it from the root folder too

and then repeat the steps above to setup the project.
