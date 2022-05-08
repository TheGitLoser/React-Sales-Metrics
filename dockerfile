FROM node:16-alpine AS development
ENV NODE_ENV=development
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]


FROM node:16-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . ./
RUN npm run build

#Stage 2
FROM nginx:1.21.6-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

