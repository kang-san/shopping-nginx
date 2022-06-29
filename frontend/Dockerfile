# ---------------------------------------
# Production stage
# ---------------------------------------
FROM node:14 as build-stage

LABEL version="1.0"
LABEL description="React Frontend for the Library API"

WORKDIR /app

COPY ./package.json ./

RUN CI=true

RUN npm install

# 소스를 작업폴더로 복사하고 빌드
COPY ./frontend .
RUN npm run build

FROM nginx:1.17.0-alpine
## nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
COPY ./nginx/nginx.conf /etc/nginx/conf.d

# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=build-stage /app/build /usr/share/nginx/html

#RUN chown nginx:nginx /usr/share/nginx/html/*
# 80포트 오픈하고 nginx 실행
EXPOSE 3000
#ENTRYPOINT ["nginx", "-g", "daemon off;"]