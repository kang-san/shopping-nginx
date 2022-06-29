FROM nginx:1.12.0

EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# Start nginx in the foreground to play nicely with Docker.
CMD ["nginx", "-g", "daemon off;"]