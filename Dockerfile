FROM node:carbon
#어플리케이션 폴더를 Workdir로 지정 - 서버가동용
WORKDIR /src
 
#Package json 복사
COPY package*.json ./
#패키지파일들 받기
RUN npm ci
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

COPY . .

EXPOSE 3000

#서버실행
CMD ["npm", "start"]