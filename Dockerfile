FROM debian:trixie

# ติดตั้ง Node.js 20 แบบ manual (เพราะ trixie ไม่มี node)
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# ติดตั้ง dependencies เพิ่มเติมที่จำเป็นสำหรับ .node
RUN apt-get install -y \
    build-essential \
    g++ \
    gcc \
    libstdc++6 \
    libcurl4 \
    ca-certificates

# ตรวจสอบว่า libcurl ติดตั้งแล้ว
RUN ls /usr/lib/x86_64-linux-gnu/libcurl*

# เตรียมแอป
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]