# NCTL-WebExplorer DEMO

## Docker image

To build a docker image with the NCTL-WebExplorer demo, follow these instructions:

1. Clone the following Git repositories

```
$ git clone -b v1.1.1 https://github.com/make-software/casper-net-sdk.git
$ git clone -b nctl-webexplorer https://github.com/make-software/casper-net-sdk-web.git
```

2. Run the docker build command

```
$ docker build -f casper-net-sdk-web/Docs/Demos/Docker-NCTLWebExplorer/NCTLWebExplorer.Dockerfile -t casper-nctlwebexplorer .
```

3. Use `docker-compose` to start a container with `NCTL` and a second container with the explorer demo

```
$ cd casper-net-sdk-web/Docs/Demos/Docker-NCTLWebExplorer/
$ docker-compose up
```

4. In your browser, navigate to `http://localhost:8081/`.
