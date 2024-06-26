FROM node:18-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile

COPY . .

ENV NEXT_PUBLIC_BASE_URI=https://timesaw.zeabur.app
ENV NEXT_PUBLIC_BACKEND_URI=https://api.timesawpuzzle.com

RUN pnpm build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN npm install -g pnpm

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts --prod

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

EXPOSE 3000

CMD ["pnpm", "start"]