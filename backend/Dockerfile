FROM openjdk:23
COPY . /usr/src/backend
WORKDIR /usr/src/backend
RUN ./mvnw package
CMD ["java" "-jar" "target/backend-0.0.1-SNAPSHOT.jar"]
