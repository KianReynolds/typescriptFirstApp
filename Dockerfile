# Stage 1: Build the Node.js application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install application dependencies
# Ensure devDependencies are installed as 'tsc' is a devDependency
RUN npm install

# Copy the rest of your application code
COPY . .

# --- DIAGNOSTIC STEP 1 ---
# List contents of the 'src' directory to confirm source files are present
RUN ls -l src
# --- END DIAGNOSTIC STEP 1 ---

# Build the TypeScript code to JavaScript
# This command executes 'tsc' from node_modules/.bin
RUN npm run build

# --- DIAGNOSTIC STEP 2 ---
# List the contents of the build directory to verify compilation output
RUN ls -l /app/build
# --- END DIAGNOSTIC STEP 2 ---

# Stage 2: Create a smaller production-ready image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port your Express app listens on
EXPOSE 3000

# Command to run your application directly with node
CMD ["node", "./build/index.js"]
