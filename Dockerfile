# Stage 1: Build the Node.js application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# --- DIAGNOSTIC STEP 0: Verify initial WORKDIR ---
RUN echo "Current directory after WORKDIR: $(pwd)"
RUN ls -la
# --- END DIAGNOSTIC STEP 0 ---

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# --- DIAGNOSTIC STEP 1: Verify package files copied ---
RUN echo "Contents after copying package*.json:"
RUN ls -la
# --- END DIAGNOSTIC STEP 1 ---

# Install application dependencies
RUN npm install

# --- DIAGNOSTIC STEP 2: Verify node_modules installed ---
RUN echo "Contents after npm install:"
RUN ls -la node_modules
# --- END DIAGNOSTIC STEP 2 ---

# Copy the rest of your application code
COPY . .

# --- DIAGNOSTIC STEP 3: Verify source files copied ---
RUN echo "Contents after copying application code (including 'src'):"
RUN ls -la
RUN ls -la src
# --- END DIAGNOSTIC STEP 3 ---

# Build the TypeScript code to JavaScript
# This command executes 'tsc' from node_modules/.bin
RUN npm run build

# --- DIAGNOSTIC STEP 4: Verify 'build' directory creation and contents ---
RUN echo "Contents of /app/build after npm run build:"
RUN ls -la build || echo "Build directory not found or empty."
# --- END DIAGNOSTIC STEP 4 ---

# Stage 2: Create a smaller production-ready image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# --- DIAGNOSTIC STEP 5: Verify WORKDIR in final stage ---
RUN echo "Current directory in final stage after WORKDIR: $(pwd)"
RUN ls -la
# --- END DIAGNOSTIC STEP 5 ---

# Copy only the necessary files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# --- DIAGNOSTIC STEP 6: Verify files copied to final stage ---
RUN echo "Contents of /app in final stage after copying from builder:"
RUN ls -la
RUN ls -la build
# --- END DIAGNOSTIC STEP 6 ---

# Expose the port your Express app listens on
EXPOSE 3000

# Command to run your application directly with node
CMD ["node", "./build/index.js"]
