FROM node:alpine
ENV JWT_KEY eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3NTYyODcxNSwiaWF0IjoxNjc1NjI4NzE1fQ.JV8mCNjaJjDWhZR1AbdJ2EfmZQJITLZzUH9dVgWG_B0

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]