FROM node:14-alpine

RUN apk add --no-cache curl python3 py3-pip bash tcpdump strace 

WORKDIR /app

COPY app/package*.json ./
RUN npm install
COPY app/ .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "app.js"]
