# Stage 1: Build the Angular app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app source code
COPY . .

# Build the Angular app for SSR
RUN npm run build:ssr

# Stage 2: Serve the app with Node.js
FROM node:18

# Set the working directory in the final image
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist/ ./dist

# Install only production dependencies (if there are any)
COPY package*.json ./
RUN npm install --only=production

# Expose the port your app will run on
EXPOSE 4000

# Run the Node server to serve the SSR app
CMD ["node", "dist/server/server.js"]
