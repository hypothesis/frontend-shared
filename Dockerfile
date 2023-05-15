FROM node:19.8.1-alpine as builder

COPY . /frontend-shared
RUN cd /frontend-shared && \
    yarn install --frozen-lockfile && \
    yarn build-pattern-lib


FROM nginx:1.24.0-alpine

RUN rm -r /usr/share/nginx/html && rm /etc/nginx/conf.d/default.conf
# Copy pattern library static assets, and put them in nginx document root folder
COPY --from=builder /frontend-shared/build /usr/share/nginx/html
COPY ./templates/index.html /usr/share/nginx/html/index.html
COPY ./images /usr/share/nginx/html/images
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5001
