FROM node:16-slim

# NOTE: we are using jemalloc as memory allocator for node to prevent memory leaks from sharp
# more info: https://sharp.pixelplumbing.com/install#linux-memory-allocator
# more info: https://storck.io/posts/psa-switch-ruby-docker-to-jemalloc-now/
RUN apt-get update &&\
  apt-get install -y --no-install-recommends libjemalloc2 &&\
  rm -rf /var/lib/apt/lists/*

ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2

# for selfhosting, we need sharp
# more info here: https://nextjs.org/docs/messages/install-sharp
RUN npm install -g sharp
ENV NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp


WORKDIR /app

COPY .next .
COPY .next/static standalone/ticking-app/.next/static
COPY public standalone/ticking-app/public

CMD ["node", "standalone/ticking-app/server.js"]
