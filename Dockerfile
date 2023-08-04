FROM node:16.20.0 AS builder

# 앱 디렉토리 생성 및 작업 디렉토리로 설정
RUN mkdir /app
WORKDIR /app

# package.json 및 package-lock.json 복사하여 npm 패키지 설치
COPY package.json .
COPY package-lock.json .
RUN npm ci

# 소스 코드 복사하여 빌드
COPY . .
RUN npm run build

# Nginx를 사용한 이미지 생성
FROM nginx:latest

# work dir 에 dist 폴더 생성 /app/dist
RUN mkdir ./dist

# host pc의 현재경로의 dist 폴더를 workdir 의 dist 폴더로 복사
ADD dist ./dist

# Nginx 설정 파일 복사
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]