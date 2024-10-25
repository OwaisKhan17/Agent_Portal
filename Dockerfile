# Use the latest Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .
COPY next.config.mjs ./next.config.mjs

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]
