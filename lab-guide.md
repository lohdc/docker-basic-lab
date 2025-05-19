# Docker Basics, Triage and IR Lab

## Getting Started
Congratulations! You have started the container for this tutorial! Let's first explain the command that you just ran. In case you forgot, here's the command:

```bash
docker run -d -p 3000:3000 --name myapp my-app:v1
```

You'll notice a few flags being used. Here's some more info on them:
- `-d` - run the container in detached mode (in the background)
- `-p 3000:3000` - map port 3000 of the host to port 3000 in the container
- `--name myapp` - to name the container "myapp"
- `my-app:v1` - the image to use

> **Pro tip**: You can combine single character flags to shorten the full command. As an example, the command above could be written as:
> ```bash
> docker run -dp 3000:3000 --name myapp my-app:v1
> ```

## Objective
- Learn the basic Docker commands
- Build and run Docker containers
- Perform simple triage and forensics acquisition on containers and images

## Exercise 1: Basic Docker Commands
1. Collect metadata from Docker Host
   ```bash
   docker --version
   docker info
   ```
2. What is the API version of the Docker Client?
3. What is the Go version of the Docker Client?
4. What is the runc version?
5. How many images and containers are there on the docker host?
6. List all images available on the docker host:
   ```bash
   docker images
   # Alternative command
   docker image ls
   ```
7. List down the images available on the docker host

## Exercise 2: Create a Dockerfile
1. Create a file named dockerfile:
   ```bash
   nano dockerfile
   ```

2. Specify alpine:3.13.6 as the base image:
   ```dockerfile
   FROM alpine:3.13.6
   ```

3. Create a new non-root user:
   ```dockerfile
   RUN adduser -D student
   ```

4. Set working directory:
   ```dockerfile
   WORKDIR /home/student
   ```

5. Create welcome message:
   ```dockerfile
   RUN echo "Welcome to your Alpine container!" > welcome.txt
   ```

6. Switch to non-root user:
   ```dockerfile
   USER student
   ```

7. Build the Docker image:
   ```bash
   docker build -t alpine_lab .
   ```

8. Run and verify:
   ```bash
   docker run --rm -it alpine_lab cat welcome.txt
   ```

## Exercise 3: Image Build History
1. Check image history:
   ```bash
   docker history alpine_lab
   ```
2. Were you able to correspond the different layers that you had created earlier?
3. Check history of my-app image:
   ```bash
   docker history my-app:v1
   ```
4. How many different layers are there?
5. Inspect the my-app image:
   ```bash
   docker inspect my-app:v1
   ```
6. When was the image created?
7. Were there other exposed ports in this image? If yes, list down the ports.

## Exercise 4: Docker Forensics
1. Copy files from container:
   ```bash
   docker cp myapp:/app/app.js ./evidence/
   docker cp myapp:/etc/passwd ./evidence/
   ```

2. Examine running processes:
   ```bash
   docker top myapp
   docker stats myapp
   ```

3. Create image from container:
   ```bash
   docker commit myapp forensics-image
   docker history forensics-image
   ```

4. Export and analyze container:
   ```bash
   docker save forensics-image -o forensics.tar
   tar -xf forensics.tar
   container-diff analyze forensics.tar
   ```

5. Investigate container:
   ```bash
   docker inspect myapp
   docker exec myapp find / -type f -name "*.log"
   docker exec myapp ps aux
   ```

## Exercise 5: Advanced Forensics
1. Network analysis:
   ```bash
   docker exec myapp tcpdump -i any -w capture.pcap
   docker cp myapp:/capture.pcap ./evidence/
   ```

2. Process tracing:
   ```bash
   docker exec myapp strace -p 1
   ```

3. Find secrets and sensitive data:
   ```bash
   docker exec myapp find / -type f -exec grep -l "password" {} \;
   docker exec myapp env | grep -i key
   ```

4. Analyze image layers:
   ```bash
   container-diff diff daemon://forensics-image daemon://node:14-alpine
   ```

## Challenge Exercises
1. Find the flag.txt and note down the flag inside
