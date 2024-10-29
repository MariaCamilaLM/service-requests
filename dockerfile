# Stage 1: Build the Angular app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the entire Angular project
COPY . .

# Build the Angular app for production
RUN ["ng", "build"]


# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy built files from Stage 1 to Nginx's default public folder
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
