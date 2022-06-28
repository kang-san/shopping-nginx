# ---------------------------------------
# Production stage
# ---------------------------------------
FROM node:16.14.0
# Create app directory
WORKDIR /app

# Install Node without having the whole application files (cache)
COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5000

# Containers run nginx with global directives and daemon off
CMD ["npm", "start"]


