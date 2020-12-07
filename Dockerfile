

## Unified build of the API backend and React frontend ##

# Build the React frontend
FROM node:12-alpine as client-build
WORKDIR /app
COPY client .
RUN npm install
RUN npm run build


# Proper production build needs to be configured in the source code
FROM node:12-alpine as backend-build
WORKDIR /app
COPY api .
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm ci --only=production
#RUN npm install --only=prod


# Copy compiled distributions to runtime stage
FROM node:12-alpine
COPY --from=client-build /app/build /app/client/build
COPY --from=backend-build /app /app/api

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /app/api
ENV PORT=5000
CMD ["npm", "start"]