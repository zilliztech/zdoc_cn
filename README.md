# How to Build the Doc Site

The Zilliz Cloud doc site is developed based on the open-source Docusauraus. All contents are hosted on Feishu docs and fetched on the fly to the final image. This doc page explains how to build the doc site step by step.

## About the `Dockerfile`

The Dockerfile in the root folder includes five stages, namely **preset**, **base**, **development**, **production**, and **deploy**.

- **preset**

    In this step, run a script on a Python base image to fetch doc pages and related images from Feishu and Figma, respectively. This step is relatively time-consuming and it will last for over 10 minutes.

- **base**

    This is a shared step for the **development** and **production** stages. In the step, the main action is to copy the doc pages and images generated in the **preset** stage.

- **development**

    This produces an image for development purpose only. Do not use it in production. The built image exposes port 3000, you can map it to any local port when running this image.

    The command to build the image is as follows:

    ```shell
    docker build --target development -t docs:dev .
    ```

    To run the built image

    ```shell
    docker run -p 3000:3000 docs:dev
    ```

- **production**

    This stage builds the doc site using Docusaurus' `build` command, and its output is the `build` directory, which is to be copied to the **deploy** stage.

- **deploy**

    This stage copies the `build` directory generated in the **production** stage and uses an Nginx image to serve this folder. Image built using the following command can be safely used in production.

    ```shell
    docker build -t zdoc:latest .
    ```

    To run the built image

    ```shell
    docker run --rm -p 3000:80 zdoc:latest
    ```

## Further steps

(To be added)