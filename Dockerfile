    # Stage 1: Build the Node.js application
    FROM node:18-alpine AS builder

    # Set the working directory inside the container
    WORKDIR /app

    # Copy package.json and package-lock.json to install dependencies
    COPY package*.json ./

    # Install application dependencies
    RUN npm install

    # --- DIAGNOSTIC STEP: Verify node_modules installed ---
    RUN echo "Contents after npm install:"
    RUN ls -la node_modules
    # --- END DIAGNOSTIC STEP ---

    # Explicitly copy the 'src' directory
    COPY src ./src
    # Copy other necessary files/folders if they are at the root level and not in src
    # For example, if you have a 'public' folder for static assets:
    # COPY public ./public
    # COPY .env ./.env # Only if you still want to copy .env, but Render env vars are preferred

    # --- DIAGNOSTIC STEP: Verify source files copied ---
    RUN echo "Contents after explicitly copying src:"
    RUN ls -la
    RUN ls -la src
    # --- END DIAGNOSTIC STEP ---

    # Build the TypeScript code to JavaScript
    RUN npm run build

    # --- DIAGNOSTIC STEP: Verify 'build' directory creation and contents ---
    RUN echo "Contents of /app/build after npm run build:"
    RUN ls -la build || echo "Build directory not found or empty."
    # --- END DIAGNOSTIC STEP ---

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
    