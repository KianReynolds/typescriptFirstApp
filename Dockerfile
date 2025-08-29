# Stage 1: Build the Node.js application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# --- DIAGNOSTIC STEP 1: Verify source files copied ---
RUN echo "Contents after copying application code (including 'src'):"
RUN ls -la
RUN ls -la src
# --- END DIAGNOSTIC STEP 1 ---

# Build the TypeScript code to JavaScript
# This command now explicitly points to tsconfig.json
RUN npm run build

# --- DIAGNOSTIC STEP 2: Verify 'build' directory creation and contents ---
RUN echo "Contents of /app/build after npm run build:"
RUN ls -la build || echo "Build directory not found or empty."
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
