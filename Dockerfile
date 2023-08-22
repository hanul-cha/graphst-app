FROM node:16.20.0 AS builder

# 앱 디렉토리 생성 및 작업 디렉토리로 설정
WORKDIR /app

# 소스 코드 복사하여 빌드
COPY . .
RUN npm i
RUN npm run build

# Nginx를 사용한 이미지 생성
FROM nginx:latest

# Nginx 설정 파일 복사
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d

# 빌드된 애플리케이션 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]