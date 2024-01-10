ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine AS builder

COPY tsconfig.json tsconfig.build.json package.json package-lock.json /action/
COPY src /action/src

RUN cd /action/ && \
    npm ci && \
    npm run build && \
    npm prune --production && \
    rm -rf src tsconfig.json tsconfig.build.json

FROM node:${NODE_VERSION}-alpine

# Copy the action bundle.
COPY --from=builder /action/dist /action/dist
COPY --from=builder /action/package.json /action/package.json
COPY --from=builder /action/node_modules /action/node_modules

ENTRYPOINT ["node", "--enable-source-maps", "/action/dist/index.js"]
