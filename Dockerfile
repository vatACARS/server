ARG IMAGE=node:20.16-alpine

#COMMON
FROM $IMAGE AS builder
WORKDIR /app
COPY . .
RUN npm i

#DEV
FROM builder AS dev
CMD [""]