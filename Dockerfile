FROM mcr.microsoft.com/playwright:v1.40.1-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Set default environment variables
ENV BROWSER=chromium
ENV HEADLESS=true
ENV BASE_URL=https://www.example.com
ENV ENV=qa

# Create directories for test results
RUN mkdir -p test-results logs

# Run tests
CMD ["npm", "test"]

