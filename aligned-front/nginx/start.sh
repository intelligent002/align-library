#!/bin/sh

# Set a default values if not provided
: "${API_URL:=http://aligned-back:80}"
: "${ENVIRONMENT:=undefined}"
: "${LOG_LEVEL:=error}"
: "${NGINX_PORT:=80}"
: "${SERVICE_NAME:=aligned-front}"

# Debugging: Output to check if it's set correctly
echo "Using API_URL: $API_URL"
echo "Using ENVIRONMENT:      $ENVIRONMENT"
echo "Using LOG_LEVEL:        $LOG_LEVEL"
echo "Using NGINX_PORT:       $NGINX_PORT"
echo "Using SERVICE_NAME:     $SERVICE_NAME"

# Replace placeholder with the environment variable or default value
envsubst '\
$API_URL \
$ENVIRONMENT \
$LOG_LEVEL \
$NGINX_PORT \
$SERVICE_NAME \
' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Replace placeholder with the environment variable or default value
envsubst '\
$API_URL \
$ENVIRONMENT \
$LOG_LEVEL \
$NGINX_PORT \
$SERVICE_NAME \
' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Replace placeholder with the environment variable or default value
jq -r ' .API_URL = env.API_URL
|       .ENVIRONMENT =      env.ENVIRONMENT
|       .LOG_LEVEL =        env.LOG_LEVEL
|       .SERVICE_NAME =     env.SERVICE_NAME
' /usr/share/nginx/html/config.json > /usr/share/nginx/html/config.json.tmp
mv -f /usr/share/nginx/html/config.json.tmp /usr/share/nginx/html/config.json

# Debugging substitutions
# cat /etc/nginx/conf.d/default.conf
# cat /etc/nginx/nginx.conf
# cat /usr/share/nginx/html/config.json

# Start NGINX
nginx -g 'daemon off;'
