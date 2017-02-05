KW_ENV=$1
./node_modules/.bin/db-migrate up --env test && ./node_modules/.bin/jasmine-node --verbose --captureExceptions ./spec/
