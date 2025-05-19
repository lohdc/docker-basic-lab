const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  let html = `
    <h1>Docker Basics, Triage and IR Lab</h1>
    <style>
      body { max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
      pre { background: #f4f4f4; padding: 10px; border-radius: 4px; }
      .exercise { margin-bottom: 40px; }
      .command { color: #0066cc; }
      .prerequisites { margin: 20px 0; padding: 15px; background: #e9f7ff; border-radius: 4px; }
    </style>

    <div class="exercise">
      <h2>The command you just ran</h2>
      <p>Congratulations! You have started the container for this tutorial! Let's first explain the command that you just ran. In case you forgot, here's the command:</p>
      <pre class="command">docker run -d -p 3000:3000 --name myapp my-app:v1</pre>
      
      <p>You'll notice a few flags being used. Here's some more info on them:</p>
      <ul>
        <li><code>-d</code> - run the container in detached mode (in the background)</li>
        <li><code>-p 3000:3000</code> - map port 3000 of the host to port 3000 in the container</li>
        <li><code>--name myapp</code> - to name the container "myapp"</li>
        <li><code>my-app:v1</code> - the image to use</li>
      </ul>

      <div class="prerequisites">
        <p><strong>Pro tip</strong></p>
        <p>You can combine single character flags to shorten the full command. As an example, the command above could be written as:</p>
        <pre class="command">docker run -dp 3000:3000 --name myapp my-app:v1</pre>
      </div>
    </div>
    
    <div class="prerequisites">
      <h2>Objective</h2>
      <ul>
        <li>Learn the basic Docker commands</li>
        <li>Build and run Docker containers</li>
        <li>Perform simple triage and forensics acquisition on containers and images</li>
      </ul>
    </div>

    <div class="exercise">
      <h2>Exercise 1: Basic Docker Commands</h2>
      <ol>
        <li>
          <p>Collect metadata from Docker Host</p>
          <pre class="command">docker --version
docker info</pre>
        </li>
        <li>
          <p>What is the API version of the Docker Client?</p>
        </li>
        <li>
          <p>What is the Go version of the Docker Client?</p>
        </li>
        <li>
          <p>What is the runc version?</p>
        </li>
        <li>
          <p>How many images and containers are there on the docker host?</p>
        </li>
        <li>
          <p>List all images available on the docker host:</p>
          <pre class="command">docker images</pre>
          <p>Alternative command to list all available:</p>
          <pre class="command">docker image ls</pre>
        </li>
        <li>
          <p>List down the images available on the docker host</p>
        </li>
      </ol>
    </div>

    <div class="exercise">
      <h2>Exercise 2: Create a Dockerfile</h2>
      <ol>
        <li>
          <p>Using a text editor of your choice, create a file named dockerfile. For example, using nano:</p>
          <pre class="command">nano dockerfile</pre>
          <p>The steps in the next section should be added to the dockerfile</p>
        </li>
        <li>
          <p>In the dockerfile specify alpine:3.13.6 as the image to use</p>
          <pre class="command">FROM alpine:3.13.6</pre>
        </li>
        <li>
          <p>Create a new non-root user inside the container:</p>
          <pre class="command">RUN adduser -D student</pre>
        </li>
        <li>
          <p>Set the working directory to the new user’s home:</p>
          <pre class="command">WORKDIR /home/student</pre>
        </li>
        <li>
          <p>Create a simple welcome message inside the container:</p>
          <pre class="command">RUN echo "Welcome to your Alpine container!" > welcome.txt</pre>
        </li>
        <li>
          <p>Switch to the new user to avoid running as root:</p>
          <pre class="command">USER student</pre>
          <p>Save the dockerfile</p>
        </li>
        <li>
          <p>Build the Docker image:</p>
          <pre class="command">docker build -t alpine_lab .</pre>
          <p>Note the dot at the end of the command. This tells Docker to look for the dockerfile in the current directory.</p>
        </li>
        <li>
          <p>Run the container and verify the welcome message:</p>
          <pre class="command">docker run --rm -it alpine_lab cat welcome.txt</pre>
          <p>--rm - remove the container after it exits</p>
          <p>-it - run the container in interactive mode</p>
          <p>cat - read the contents of the welcome.txt file</p>
          <p>If you see the message "Welcome to your Alpine container!" then you have successfully built and run your first Docker container!</p>
        </li>
      </ol>
    </div>

    <div class="exercise">
      <h2>Exercise 3: Image Build History</h2>
      <ol>
        <li>
          <p>Using the image you created in the previous exercise, check the history of the image:</p>
          <pre class="command">docker history alpine_lab</pre>
          <p>This will show you the layers of the image and the commands used to create them.</p>
        </li>
        <li>
          <p>Were you able to correspond the different layers that you had created earlier?</p>
        </li>
        <li>
          <p>Now check history of my-app image</p>
          <pre class="command">docker history my-app:v1</pre>
        </li>
        <li>
          <p>How many different layers are there?</p>
        </li>
        <li>
          <p>Inspect the my-app image</p>
          <pre class="command">docker inspect my-app:v1</pre>
          <p>This will show you the metadata of the image, including the environment variables, entrypoint, and command used to run the container.</p>
        </li>
        <li>
          <p>When was the image created?</p>
        </li>
        <li>
          <p>Were there other exposed port in this image?If yes, list down the ports</p>
        </li>
      </ol>
    </div>  

    <div class="exercise">
      <h2>Exercise 4: Docker Forensics</h2>
      <ol>
        <li>
          <p>For this lab, you will use prebuilt image that need to be loaded.</p>
          <pre class="command">docker load -i /lab/prebuilt/nginx_lab.tar.gz</pre>
        </li>
        <li>
          <p>There should now be an image loaded called nginx_lab:latest. Confirm this with:</p>
          <pre class="command">docker image ls</pre>
        </li>
        <li>
          <p>This container needs to be running to allow interaction with it during the lab, so once it is installed run it with:</p>
          <pre class="command">docker run --rm --name nginx-lab -dp 80:80 nginx_lab</pre>
        </li>
        <li>
          <p>Try to extract the docker logs from the nginx-lab container</p>
          <pre class="command">docker logs nginx-lab</pre>
          <p>This should provide nothing, and simply return some output the startup of the container in the earlier steps.</p>
          <p>This is often the case in incident response when dealing with containers/images that have been moved from the host platform.</p>
        </li>
        <li>
          <p>As an alternative we can try to extract the web servers logs for local analysis. The default path for Nginx logs is /var/log/nginx/access.log, so we can use docker cp to export it.</p>
          <pre class="command">docker cp nginx-lab:/var/log/nginx/access.log ./evidence/</pre>
          <p>Analyze the logs and see if you can find any interesting information?</p>
        </li>
        <li>
          <p>The size of the access.log is too small, it indicates that it contain no data.</p>
          <p>The file you copied is empty, and this is expected. The access.log is a symbolic link file</p>
          <pre class="command">file /evidence/access.log</pre>
          <p>To find the real file, we can use the readlink command to find the target of the symbolic link:</p>
          <pre class="command">docker exec nginx-lead readlink -f /var/log/nginx/access.log</pre>  
          <p>The output is rather interesting, indicating that access.log is not a regular file or even a typical symlink target. It is actually a named pipe, a pipe to another process.</p>
          <p>In a container setup, especially with logging drivers like docker logs or when logs are redirected to stdout/stderr</p>
          <p>Recall in the lesson, the logs are stored on the docker host. The default path for each container logs is /var/lib/docker/container/<container id>/<container id>-json.log</p>
        </li>
    </div>

    <div class="exercise">
      <h2>Challenge Exercises</h2>
      <ol>
        <li>Find the flag.txt inside the my-app:v1 image</li>
        <p>Hint: Use the docker cp command to copy the file from the container to the host</p>                
        <p>Hint: Use the docker history to find the layer of interest, remember --no-trunc</p>
        <p>Hint: Use the docker commit and save it as a tar.gz file and extract the layer</p>
      </ol>
    </div>
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Lab guide available at http://localhost:${port}`);
});
