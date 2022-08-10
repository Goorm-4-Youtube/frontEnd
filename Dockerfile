# Build
FROM node:16.16.0-alpine AS build
WORKDIR /var/lib/jenkins/workspace/frontend_build_test
COPY package.json package-lock.json ./
RUN npm config set strict-ssl false
RUN npm install
COPY . .
RUN npm run build

# Run 
FROM nginx:1.22-alpine
COPY --from=build /var/lib/jenkins/workspace/frontend_build_test/dist/youtube-clone-ui /usr/share/nginx/html
