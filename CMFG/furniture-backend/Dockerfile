FROM docker-local.jfrog.enetdefender.com/node16-npm7:v1
#FROM node:latest
#FROM vikaschenny/node-npm:vikas1.0
 
# Create app directory
WORKDIR /usr/src/app
 
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY package.json /usr/src/app/
 
RUN npm install
 
# If you are building your code for production
# RUN npm install --only=production
 
# Bundle app source
COPY . .
 
EXPOSE 3000
CMD [ "npm", "start" ]
