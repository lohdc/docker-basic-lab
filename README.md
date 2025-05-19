# Docker Basics, Triage and IR Lab

A hands-on laboratory for learning Docker basics, container forensics, and incident response techniques.

## Overview

This lab provides practical exercises for:
- Basic Docker commands and container management
- Building custom Docker images
- Container forensics and investigation
- Advanced forensics techniques
- Network analysis and process tracing

## Repository Structure

```
docker-basic-lab/
├── app/
│   └── app.js           # Lab guide web application
├── lab-instructions.md  # Detailed lab instructions
├── lab-guide.md        # Step-by-step guide
├── README.md           # This file
```

## Prerequisites

- Docker installed
- Docker Compose installed
- Basic command line knowledge

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://gitlab.com/your-username/docker-basic-lab.git
   cd docker-basic-lab
   ```

2. Build the lab application:
   ```bash
   docker build -t my-app:v1 .
   ```

3. Start the lab environment:
   ```bash
   docker run -d -p 3000:3000 --name myapp my-app:v1
   ```

4. Access the lab guide:
   - Open your browser and navigate to `http://localhost:3000`
   - Or read the lab instructions directly from `lab-instructions.md`

## Lab Exercises

1. Basic Docker Commands
   - Version information
   - Container and image management
   - Basic operations

2. Building Images
   - Creating Dockerfiles
   - Building custom images
   - Image inspection

3. Running Containers
   - Container lifecycle
   - Container operations
   - Resource management

4. Docker Forensics
   - File extraction
   - Process analysis
   - Container investigation

5. Advanced Forensics
   - Network capture
   - Process tracing
   - Secret detection
   - Layer analysis

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
