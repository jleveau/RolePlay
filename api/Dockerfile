# Use the official Node.js 16 image as a parent image
FROM node:22-alpine

# Set the working directory inside the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package*.json ./

# Install dependencies, including 'typescript' and any other build tools
RUN npm install

# Copy the rest of your application's source code from your host to your image filesystem.
COPY . .

# Build the TypeScript project (this assumes you have a "build" script in your package.json)
RUN npm run build

# Inform Docker that the container listens on the specified port at runtime.
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "dist/index.js"]
