# Usage
# Env Variables:
# REGISTRY: the docker registry to push the image to. ex: hub.docker:5000
# BUILD_NUMBER: the unique to this build number.  ex: 1
# PROJECT_NAME: The name of the project.  Defaults to "frontend". ex: my-cool-project-name

cd $(git rev-parse --show-toplevel) || exit 1

REGISTRY=slowback
TAG=mlb-spit-counter

docker build -t=${TAG} -f docker/Dockerfile --target=final .
docker image tag ${TAG} ${REGISTRY}/${TAG}

docker image push ${REGISTRY}/${TAG}