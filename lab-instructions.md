# Docker Basics Lab

## Prerequisites
- Docker installed
- Docker Compose installed
- Basic command line knowledge

## Lab Exercises

### Exercise 1: Basic Docker Commands
1. Check Docker version:
   ```bash
   docker --version
   docker info
   ```

2. Pull an image:
   ```bash
   docker pull nginx
   ```

3. List images:
   ```bash
   docker images
   ```

### Exercise 2: Building Images
1. Build the lab application:
   ```bash
   docker build -t my-app:v1 .
   ```

2. Examine the image:
   ```bash
   docker history my-app:v1
   docker inspect my-app:v1
   ```

### Exercise 3: Running Containers
1. Run the application:
   ```bash
   docker run -d -p 3000:3000 --name myapp my-app:v1
   ```

2. List running containers:
   ```bash
   docker ps
   ```

3. Container operations:
   ```bash
   docker logs myapp
   docker exec -it myapp sh
   docker stop myapp
   docker rm myapp
   ```

### Exercise 4: Docker Compose
1. Start services:
   ```bash
   docker-compose up -d
   ```

2. Check service status:
   ```bash
   docker-compose ps
   docker-compose logs
   ```

3. Scale services:
   ```bash
   docker-compose up -d --scale web=3
   ```

4. Stop services:
   ```bash
   docker-compose down
   ```

### Exercise 5: Docker Forensics
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

### Exercise 6: Advanced Forensics
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
1. Modify the Dockerfile to use a multi-stage build
2. Add environment variables to the application
3. Create a volume for persistent data
4. Implement healthchecks for the services
5. Use container-diff to find vulnerabilities
6. Create a forensics report of findings
7. Implement secure secret management
8. FLAG{d0ck3r_ch4ll3ng3_l4b_2025}