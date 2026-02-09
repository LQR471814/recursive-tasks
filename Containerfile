FROM trailbase/trailbase:latest

WORKDIR /app
COPY ./dist /app/public
COPY ./traildepot/config.textproto /app/traildepot/config.textproto
COPY ./traildepot/migrations /app/traildepot/migrations
COPY ./traildepot/wasm /app/traildepot/wasm

CMD /app/trail run --spa --public-dir /app/public --address 0.0.0.0:4000

