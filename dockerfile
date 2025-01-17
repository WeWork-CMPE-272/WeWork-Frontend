# stage1 - build react app first 
FROM 837909195439.dkr.ecr.us-east-1.amazonaws.com/node:14.15.1 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY . /app
RUN npm install
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM 837909195439.dkr.ecr.us-east-1.amazonaws.com/nginx:1.17.8
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]