echo "Script executed from: ${PWD}"

BASEDIR=$(dirname $0)
echo "Script location: ${BASEDIR}"
parentdir="$(dirname "$(pwd)")"
echo "parent directory: ${parentdir}"
cd ..
ls
cd dependency/airbyte
docker-compose up