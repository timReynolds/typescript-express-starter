FROM node:8-alpine@sha256:c9f2470464363addb0be6a61678f44854e73eee974bbc792a71d4d2b7ffd5edd as builder

COPY ./package.json /build/package.json
COPY ./package-lock.json /build/package-lock.json

# install node packages
RUN npm set progress=false && npm config set depth 0
RUN cd /build && npm install --only=production 

# copy production node_modules aside
RUN cp -a /build/node_modules /build/prod_node_modules

# install ALL node_modules, including 'devDependencies'
RUN cd /build && npm install

COPY ./src /build/src
COPY ./bin /build/bin
COPY ./migrations /build/migrations
COPY ./integration /build/integration
COPY ./tsconfig.json /build/tsconfig.json
COPY ./tslint.json /build/tslint.json

WORKDIR /build

RUN npm run build

FROM node:8-alpine@sha256:c9f2470464363addb0be6a61678f44854e73eee974bbc792a71d4d2b7ffd5edd

# Take only the production node modules
COPY --from=builder /build/prod_node_modules ./node_modules
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/bin ./bin
COPY --from=builder /build/package.json ./package.json

CMD ["node", "/bin/www"]