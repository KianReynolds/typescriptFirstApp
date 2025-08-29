# Stage 1: Build the Node.js application
# Use a lightweight Node.js image as the base
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
# We copy these first to leverage Docker's layer caching
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the TypeScript code to JavaScript
# Assuming your tsconfig.json is in the root and outputs to 'build'
RUN npm run build

# Stage 2: Create a smaller production-ready image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
# This includes the built JavaScript files and node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env 
# Copy your .env file for environment variables

# Expose the port your Express app listens on
# Based on your .env, your app listens on port 3000
EXPOSE 3000

# Command to run your application
# This uses the 'start' script defined in your package.json
CMD ["npm", "run dev"]
