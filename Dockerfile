# Build
FROM node:16.16.0-alpine AS build
WORKDIR /var/jenkins_home/workspace/frontendpipline
COPY package.json package-lock.json ./
RUN npm config set strict-ssl false
RUN npm install
COPY . .
RUN npm run build

# Run
FROM nginx:1.22-alpine
COPY /var/jenkins_home/workspace/conf/default.conf /etc/nginx/conf.d/
COPY --from=build /var/jenkins_home/workspace/frontendpipline/dist/youtube-clone-ui /usr/share/nginx/html

