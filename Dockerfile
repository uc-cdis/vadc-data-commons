# docker build -t gen3ff .
# docker run -p 3000:3000 -it gen3ff
# for Macbook silicon M1/m2 uncomment the following lines and comment quay.io/cdis/ubuntu:20.04:
#FROM arm64v8/ubuntu:20.04 as build

FROM quay.io/cdis/ubuntu:20.04 AS build

ARG NODE_VERSION=20

ARG BASE_PATH
ARG NEXT_PUBLIC_PORTAL_BASENAME
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /gen3

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libssl1.1 \
    libgnutls30 \
    ca-certificates \
    curl \
    git \
    gnupg \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_VERSION.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y nodejs \
    && apt-get clean \
    && npm install -g npm@10.5.2

RUN  addgroup --system --gid 1001 nextjs && adduser --system --uid 1001 nextjs
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./src ./src
COPY ./public ./public
COPY ./config ./config
COPY ./next.config.js ./
COPY ./next-custom-image-loader.js ./
COPY ./tsconfig.json ./
COPY ./.env.development ./
COPY ./.env.production ./
COPY ./tailwind.config.js ./
COPY ./postcss.config.js ./
COPY ./start.sh ./
RUN npm install @swc/core @napi-rs/magic-string && \
    npm run build

# Production stage
FROM node:20-slim AS runner

WORKDIR /gen3

RUN addgroup --system --gid 1001 nextjs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /gen3/package.json ./
COPY --from=builder /gen3/node_modules ./node_modules
COPY --from=builder /gen3/config ./config
COPY --from=builder /gen3/.next ./.next
COPY --from=builder /gen3/public ./public
COPY --from=builder /gen3/start.sh ./start.sh
RUN mkdir -p /gen3/.next/cache/images
RUN chmod -R 777 /gen3/.next/cache
RUN chown nextjs:nextjs /gen3/.next

USER nextjs:nextjs
ENV PORT=3000
CMD bash ./start.sh
