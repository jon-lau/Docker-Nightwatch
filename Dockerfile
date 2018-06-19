FROM alpine:3.7

RUN apk --no-cache add \
  # Install NodeJS:
    nodejs \
  && npm install -g \
  # Install Nightwatch.js:
    nightwatch@'<1.0' \
  # Clean up obsolete files:
  && rm -rf \
    /tmp/* \
    /root/.npm

# Add node system user/group 
RUN adduser -D -u 1000 node

USER node

WORKDIR /home/node

COPY wait-for.sh /usr/local/bin/wait-for
COPY entrypoint.sh /usr/local/bin/entrypoint

ENTRYPOINT ["entrypoint"]
