FROM node:22-alpine
WORKDIR /app
COPY --chown=node:node server/index.mjs ./server/index.mjs
USER node
ENV PORT=3001
EXPOSE 3001
CMD ["node", "server/index.mjs"]
