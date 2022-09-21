# NCTL-WebExplorer DEMO

## Docker image

To build a docker image with the NCTL-WebExplorer demo, follow these instructions:

1. Clone the Git repository

```
$ git clone -b nctl-webexplorer https://github.com/make-software/casper-net-sdk-web.git
```

NOTE: the user must have access to the `make-software` GitHub organization.

2. Run the docker build command

```
$ docker build -f casper-net-sdk-web/Docs/Demos/Docker-NCTLWebExplorer/NCTLWebExplorer.Dockerfile -t casper-nctlwebexplorer .
```

3. Use `docker-compose` to start a container with `NCTL` and a second container with the explorer demo

```
$ cd casper-net-sdk-web/Demos/Docker-NCTLWebExplorer/
$ docker-compose up
```

4. In your browser, navigate to `http://localhost:8081/`.
