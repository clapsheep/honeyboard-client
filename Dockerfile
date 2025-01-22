# 플랫폼 명시 및 Node.js 버전 업데이트
FROM --platform=linux/amd64 node:20

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 5173 포트 노출
EXPOSE 5173

# 개발 서버 실행
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]