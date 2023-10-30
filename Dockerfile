FROM oven/bun AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install

# Development image, copy all the files and run the server
FROM base AS run
WORKDIR /app
# Copy files
COPY --from=deps /app/node_modules/ ./node_modules/
COPY src/ ./src/
COPY .env* package.json tsconfig.json ./
RUN bun build:prod

# Set environment variables
ENV NODE_ENV=production
CMD bun run start

ENV PORT 3000
ENV HOSTNAME localhost
EXPOSE 3000
