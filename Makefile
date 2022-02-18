rmi:
	docker rmi vvitrina:serve
build:
	docker build -t vvitrina:serve .
run:
	docker run -d -p 4200:4200 -p 8080:8080 --name vvitrina --rm vvitrina:serve
stop:
	docker stop vvitrina