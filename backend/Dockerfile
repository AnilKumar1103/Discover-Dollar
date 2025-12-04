FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including dotenv
RUN npm install dotenv && npm install

# Copy app code
COPY . .

EXPOSE 8080
CMD ["node", "server.js"]
