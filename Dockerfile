FROM node:12-alpine

ARG CI_COMMIT_SHA
ARG GIT_COMMIT_TIME
ENV OS=docker TZ=Asia/Bangkok CI_COMMIT_SHA=$CI_COMMIT_SHA GIT_COMMIT_TIME=$GIT_COMMIT_TIME
ENV NODE_ENV=production

RUN apt-get update
RUN apt-get install -y \
  curl tzdata git && \
  cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
  apt-get remove -y tzdata

WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production --silent && yarn cache clean
COPY . .

EXPOSE 80 443
HEALTHCHECK --interval=15s --timeout=3s --retries=3 --start-period=10s \
  CMD curl --fail -k http://127.0.0.1/healthcheck || exit 1

# RUN addgroup -S user && adduser -S -G user user 
# USER user

CMD yarn start
