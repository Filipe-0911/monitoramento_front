docker build -t monitoramento_front_v1 .
docker run -d -p 5173:80 --name monitoramento_front_v1 monitoramento_front_v1