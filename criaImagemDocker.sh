docker rm -f filipe0911/monitoramento_front_v1:latest
docker rmi -f filipe0911/monitoramento_front_v1:latest
docker rmi -f monitoramento_front_v1:latest
docker build \
  --build-arg VITE_LOGIN_API=/api \
  -t filipe0911/monitoramento_front_v1 .

docker tag monitoramento_front_v1 filipe0911/monitoramento_front_v1:latest
docker push filipe0911/monitoramento_front_v1:latest