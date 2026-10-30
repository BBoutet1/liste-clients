FROM node:26.12.0-bookworm-slim AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --no-fund --no-audit
COPY frontend/ ./
RUN npm test && npm run build

FROM maven:3.9.16-eclipse-temurin-17 AS backend
WORKDIR /app
COPY pom.xml ./
RUN mvn -B --no-transfer-progress -P'!frontend' dependency:go-offline
COPY src ./src
COPY --from=frontend /app/frontend/dist ./frontend/dist
RUN mvn -B --no-transfer-progress -P'!frontend' verify

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
RUN groupadd --gid 10001 app && useradd --uid 10001 --gid app --no-create-home app
COPY --from=backend --chown=app:app /app/target/liste-clients.jar ./liste-clients.jar
USER app
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=60.0 -XX:+ExitOnOutOfMemoryError"
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/liste-clients.jar"]
