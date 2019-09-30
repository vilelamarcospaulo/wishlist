FROM node:10

WORKDIR /usr/src/wishlist

ENV PORT=3000
ENV AUTH_TOKEN_VALUE=auth
ENV JWT_SECRET_VALUE=S3cr3T

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]