FROM node:20.11.1-alpine3.19

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

RUN yarn config set network-timeout 600000

COPY --chown=appuser:appgroup package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=appuser:appgroup . .

RUN yarn build

RUN yarn install --production --frozen-lockfile

USER appuser

EXPOSE 3000

CMD ["yarn", "start"] 