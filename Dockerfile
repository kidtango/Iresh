# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#ENV REACT_APP_AUTH_CLIENT_ID=g5KTggnlf7SNNDx7p8WRVotOzNrajnOZ
#ENV REACT_APP_AUTH_DOMAIN=maana-sales.auth0.com
#ENV REACT_APP_AUTH_AUDIENCE=https://h4.maana.io/
#ENV REACT_APP_BACKEND_ENV=development
ENV REACT_APP_AUTH_CLIENT_ID=8zC8sDvKafEzieGmaAym7NYfV6YVlHUH
ENV REACT_APP_AUTH_DOMAIN=maana-projects.auth0.com
ENV REACT_APP_AUTH_AUDIENCE=https://maanaprojects.maana.io/
ENV REACT_APP_BACKEND_ENV=development


# install and cache app dependencies
# installing git, sometimes node packages use it
RUN apk add --no-cache git
COPY ./package.json /app/package.json
RUN npm install 
RUN npm install -g local-web-server
COPY ./ /app
RUN GENERATE_SOURCEMAP=false npm run build

EXPOSE 3000

# start app
# CMD ["npm", "start"]
CMD ["ws", "-s", "index.html", "--directory", "./build", "-p", "3000"]