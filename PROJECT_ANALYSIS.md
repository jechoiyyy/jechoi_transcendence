# ft_transcendence 프로젝트 분석 문서

> 분석일: 2026-02-08
> 프로젝트: 실시간 온라인 카드 게임 플랫폼 + 블록체인 통합

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [아키텍처](#4-아키텍처)
5. [현재 구현 상태](#5-현재-구현-상태)
6. [주요 데이터 흐름](#6-주요-데이터-흐름)
7. [API 명세](#7-api-명세)
8. [개발 환경 실행](#8-개발-환경-실행)
9. [향후 작업](#9-향후-작업)

---

## 1. 프로젝트 개요

### 1.1 프로젝트 설명
ft_transcendence는 **실시간 멀티플레이어 카드 게임 플랫폼**입니다.
- 사용자 인증 (이메일 기반 회원가입)
- 실시간 게임 로비 및 채팅
- 게임 방 생성/입장
- 블록체인에 게임 결과 기록 (Avalanche Fuji Testnet)

### 1.2 팀 구성
| 역할 | 담당자 |
|------|--------|
| Product Owner (PO) | hekim |
| Project Manager / Scrum Master | seokson |
| Technical Lead / Architect | jechoi |

---

## 2. 기술 스택

### 2.1 프론트엔드 (Client)
```
Framework       React 18.2.0
Build Tool      Vite 5.0.0
Styling         Tailwind CSS 3.4.14
Router          React Router DOM 6.22.3
HTTP Client     Axios 1.13.2
WebSocket       Socket.IO Client 4.8.1
Icons           React Icons 5.5.0
```

### 2.2 백엔드 (Server)
```
Runtime         Node.js
Framework       Express 4.19.0
Database        MariaDB (Sequelize ORM)
Cache/Session   Redis 7 (ioredis)
Auth            JWT + bcrypt
WebSocket       Socket.IO 4.8.1
Rate Limiting   express-rate-limit
Email           Nodemailer
Blockchain      ethers.js 6.13.0
```

### 2.3 인프라 (DevOps)
```
Container       Docker + Docker Compose
Web Server      Nginx (Production)
SSL/TLS         Self-signed (개발용)
Automation      Makefile
```

### 2.4 블록체인
```
Network         Avalanche C-Chain (Fuji Testnet)
Language        Solidity ^0.8.20
Framework       Hardhat 3.1.7
Client          ethers.js v6
```

---

## 3. 프로젝트 구조

### 3.1 전체 디렉토리 구조
```
ft_transcendence/
├── client/                 # 프론트엔드 (React + Vite)
├── server/                 # 백엔드 (Node.js + Express)
├── docker/                 # Docker Compose 설정
├── nginx/                  # Nginx 리버스 프록시
├── mariadb/                # DB 초기화 스크립트
├── Makefile                # 빌드/배포 자동화
└── README.md
```

### 3.2 Client 구조
```
client/src/
├── app/                    # 앱 진입점
│   ├── app.jsx            # 루트 컴포넌트 (Provider 래핑)
│   └── main.jsx           # React DOM 마운트
│
├── pages/                  # 페이지 컴포넌트 (4개)
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── HomePage.jsx       # 메인 로비
│   └── RoomPage.jsx       # 게임 방
│
├── components/
│   ├── form/              # 폼 컴포넌트 (9개)
│   ├── layout/            # 레이아웃 (Navbar, Footer, Background)
│   └── ui/
│       ├── base/          # 기본 UI (Button, Input, Modal 등 12개)
│       ├── game/          # 게임 UI (GameBoard, GameCard 등 7개)
│       └── player/        # 플레이어 UI (3개)
│
├── contexts/               # React Context (상태관리)
│   ├── UserContext.jsx    # 사용자 정보
│   ├── ToastContext.jsx   # 토스트 알림
│   └── InputContext.jsx   # 키보드 입력
│
├── hooks/                  # 커스텀 훅 (28개)
│   ├── auth/              # useLogin, useSignup, useLogout 등
│   ├── user/              # useUserInfo, useChangeName
│   ├── game/              # useCreateGame, useEnterGame, useGameRooms
│   ├── socket/            # useAutoConnect, useChatMessages 등
│   └── utils/             # useAutoScroll, useTimer
│
├── services/
│   ├── api/               # REST API 서비스
│   └── socket/            # WebSocket 관리
│
├── routes/                 # 라우팅 설정
└── utils/                  # 유틸리티 함수
```

### 3.3 Server 구조
```
server/src/
├── server.js               # 메인 진입점
│
├── config/
│   └── env.js             # 환경 설정
│
├── middleware/
│   ├── authMiddleware.js           # JWT 인증
│   ├── socketAuthMiddleware.js     # Socket 인증
│   ├── userCheckMiddleware.js      # 사용자 검증
│   └── rateLimitMiddleware.js      # Rate Limiting
│
├── db
│   ├── mysql/
│   │   ├── mysql.js       # Sequelize 설정 + User 모델
│   │   └── user.js        # User CRUD 함수
│   └── redis/
│       ├── redis.js       # Redis 연결
│       ├── redisForm.js   # Redis 래퍼
│       └── addOnlineUser.js
│
├── services/
│   ├── api/
│   │   ├── auth/          # 로그인, 회원가입, 이메일인증
│   │   ├── user/          # 사용자 정보, 닉네임 변경
│   │   ├── games/         # 게임 방 CRUD
│   │   ├── apiRoutes.js   # 라우트 통합
│   │   └── initApi.js     # Express 앱 설정
│   │
│   └── socket/
│       ├── initSocket.js          # Socket.IO 초기화
│       ├── onConnectSocket.js     # 연결 핸들러
│       └── socketOn/              # 이벤트 핸들러들
│           ├── move.js            # 위치 이동
│           ├── chat.js            # 채팅
│           ├── heartbeat.js       # 하트비트
│           └── disconnect.js      # 연결 해제
│
├── plugins/                # 비즈니스 로직 플러그인
│   ├── authCookie.js      # JWT 쿠키 관리
│   ├── email.js           # 이메일 발송
│   ├── chatSocket.js      # 채팅 로직
│   └── roomGetall.js      # 게임 방 조회
│
├── utils/
│   └── RandomValue.js     # 랜덤 문자열 생성
│
└── blockchain/             # 블록체인 통합
    ├── contracts/         # Hardhat 프로젝트
    │   ├── contracts/     # Solidity 컨트랙트
    │   ├── scripts/       # 배포 스크립트
    │   └── test/          # 테스트
    └── *.md               # 문서들
```

---

## 4. 아키텍처

### 4.1 전체 시스템 아키텍처
```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (React)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Pages   │  │Components│  │  Hooks   │  │     Contexts     │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘ │
│       └─────────────┴─────────────┴─────────────────┘           │
│                              │                                  │
│              ┌───────────────┴───────────────┐                  │
│              │         Services              │                  │
│              │  ┌─────────┐  ┌───────────┐  │                   │
│              │  │   API   │  │  Socket   │  │                   │
│              │  │ (Axios) │  │(Socket.IO)│  │                   │
│              │  └────┬────┘  └─────┬─────┘  │                   │
│              └───────┼─────────────┼────────┘                   │
└──────────────────────┼─────────────┼────────────────────────────┘
                       │ HTTP        │ WebSocket
                       ▼             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Nginx (Production)                         │
│                   Port 8443 (HTTPS/WSS)                         │
└─────────────────────────────────────────────────────────────────┘
                       │             │
                       ▼             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Server (Express)                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                     Middleware                           │   │
│  │  authMiddleware → rateLimitMiddleware → userCheck        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                  │
│       ┌──────────────────────┴──────────────────────┐           │
│       ▼                                             ▼           │
│  ┌─────────────┐                           ┌─────────────┐      │
│  │  REST API   │                           │  Socket.IO  │      │
│  │ /api/auth   │                           │   Events    │      │
│  │ /api/user   │                           │  move/chat  │      │
│  │ /api/games  │                           │  heartbeat  │      │
│  └──────┬──────┘                           └──────┬──────┘      │
│         └────────────────────┬────────────────────┘             │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                      Plugins                             │   │
│  │  authCookie / email / chatSocket / roomGetall            │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
┌─────────────────┐            ┌─────────────────┐
│    MariaDB      │            │     Redis       │
│  ─────────────  │            │  ─────────────  │
│  • users        │            │  • sessions     │
│  • game_history │            │  • online users │
│  (영구 저장)      │            │  • game rooms   │
└─────────────────┘            │  (실시간 캐시)    │
                               └─────────────────┘
                                       │
                                       ▼
                        ┌─────────────────────────┐
                        │   Blockchain (Fuji)     │
                        │  ─────────────────────  │
                        │  • GameRegistry.sol     │
                        │  • 게임 결과 불변 기록      │
                        └─────────────────────────┘
```

### 4.2 인증 플로우
```
[회원가입]
1. POST /api/auth/signup
   → 이메일/비밀번호 검증
   → bcrypt로 비밀번호 해싱
   → Redis에 가입 대기 정보 저장 (TTL: 12분)
   → 인증 코드 이메일 발송

2. POST /api/auth/emailauth
   → 코드 검증
   → 랜덤 닉네임 생성
   → MySQL에 사용자 생성

[로그인]
1. POST /api/auth/login
   → 이메일/비밀번호 검증
   → JWT 생성
   → HttpOnly 쿠키에 저장 (7일)

[인증 검증]
- REST API: authMiddleware → 쿠키에서 JWT 검증
- Socket: socketAuthMiddleware → 핸드셰이크에서 쿠키 파싱
```

### 4.3 게임 방 플로우
```
[방 생성]
POST /api/games/create
  → Redis에 방 정보 저장 (games:createRoom:{roomId})
  → 대기 목록에 추가 (rooms:waiting)
  → 플레이어 준비 상태 초기화 (room:{roomId}:ready)
  → 3분 TTL 설정

[방 입장]
POST /api/games/enter
  → 방 존재 확인
  → 최대 인원 확인
  → 비밀번호 검증
  → 플레이어 준비 상태 추가

[위치 이동 - Socket]
socket.emit("move", { type: "lobby" | "room" | "game", roomId })
  → 이전 room 떠나기
  → 새 room 참여
  → socket.data.location 업데이트
```

### 4.4 Redis 데이터 구조
```
# 온라인 사용자
online:users                     → Set: [email1, email2, ...]
online:user:{email}              → Hash: { nickname, socketId, lastSeen }

# 게임 방
rooms:waiting                    → Set: [roomId1, roomId2, ...]
games:createRoom:{roomId}        → Hash: { roomId, roomName, mode, password, madeName, maxPlayer }
room:{roomId}:ready              → Hash: { email1: false, email2: true, ... }

# 가입 대기
signup:user:{email}              → Hash: { email, password, code } (TTL: 12분)

# Rate Limiting
socket:chat_rate:{email}         → 채팅 Rate Limit
socket:onlineuser_rate:{email}   → 온라인 사용자 조회 Rate Limit
```

---

## 5. 현재 구현 상태

### 5.1 완료된 기능 (약 60%)

#### 인증 시스템 ✅ 100%
- [x] 이메일 회원가입 (비밀번호 6자 이상)
- [x] 이메일 인증 코드 발송/검증
- [x] JWT 로그인/로그아웃
- [x] 세션 유지 (쿠키 기반)
- [x] 중복 접속 방지

#### 사용자 관리 ✅ 100%
- [x] 프로필 조회 (닉네임, 승패, 레이팅, 레벨)
- [x] 닉네임 변경 (2-14자, 영문/한글/숫자/_)
- [x] 온라인 상태 추적

#### 게임 로비 ✅ 80%
- [x] 게임 방 생성 (이름, 비밀번호)
- [x] 게임 방 목록 조회 (페이지네이션)
- [x] 게임 방 입장 (비밀번호 검증)
- [x] 플레이어 준비 상태 추적

#### 실시간 통신 ✅ 100%
- [x] Socket.IO 연결/해제
- [x] 하트비트 (30초 간격)
- [x] 위치 추적 (lobby/room/game)
- [x] 실시간 채팅

#### UI/UX ✅ 90%
- [x] 반응형 레이아웃
- [x] 다크 테마 (블루 그라데이션)
- [x] 모달, 토스트 알림
- [x] 폼 검증 및 에러 표시

### 5.2 미완료 기능 (약 40%)

#### 게임 플레이 ❌ 0%
- [ ] 게임 렌더링 (GameBoard 미구현)
- [ ] 게임 로직 (카드 분배, 턴 관리)
- [ ] 점수 계산 및 승자 판정
- [ ] 게임 결과 저장

#### 매칭 시스템 ⚠️ 30%
- [ ] 자동 매칭 알고리즘
- [ ] 레이팅 기반 매칭
- [ ] 빠른 게임 찾기

#### 블록체인 ⚠️ 20%
- [x] 스마트 컨트랙트 작성 (GameRegistry.sol)
- [x] 개발 문서 작성
- [ ] 실제 배포 및 연동
- [ ] 게임 결과 기록

#### 추가 기능 ❌ 0%
- [ ] 친구 관리
- [ ] 게임 초대
- [ ] 리더보드
- [ ] 관리자 기능

### 5.3 기능별 완성도 요약

| 카테고리 | 완성도 | 상태 |
|----------|--------|------|
| 인증/회원가입 | 100% | ✅ 완료 |
| 사용자 프로필 | 100% | ✅ 완료 |
| 게임 방 관리 | 80% | ✅ 대부분 완료 |
| 실시간 통신 | 100% | ✅ 완료 |
| 채팅 | 100% | ✅ 완료 |
| 게임 UI | 30% | ⚠️ 기본 컴포넌트만 |
| 게임 로직 | 0% | ❌ 미구현 |
| 블록체인 | 20% | ⚠️ 문서/컨트랙트만 |
| **전체** | **~55%** | 🔄 진행 중 |

---

## 6. 주요 데이터 흐름

### 6.1 로그인 → 로비 진입
```
1. LoginPage: 이메일/비밀번호 입력
        ↓
2. useLogin → POST /api/auth/login
        ↓
3. 서버: JWT 생성 → 쿠키 설정
        ↓
4. 클라이언트: UserContext에 사용자 정보 저장
        ↓
5. HomePage로 리다이렉트
        ↓
6. useAutoConnect → Socket 연결
        ↓
7. useMoveSocket → socket.emit("move", { type: "lobby" })
        ↓
8. 서버: socket.join("lobby")
        ↓
9. 채팅 및 온라인 사용자 목록 실시간 수신
```

### 6.2 게임 방 생성 → 입장
```
1. CreateRoomModal: 방 이름/비밀번호 입력
        ↓
2. useCreateGame → POST /api/games/create
        ↓
3. 서버:
   - Redis에 방 정보 저장
   - rooms:waiting에 추가
   - 3분 TTL 설정
        ↓
4. useEnterGame → POST /api/games/enter
        ↓
5. 서버:
   - 비밀번호 검증
   - room:{roomId}:ready에 플레이어 추가
        ↓
6. RoomPage로 네비게이트
        ↓
7. useMoveSocket → socket.emit("move", { type: "room", roomId })
        ↓
8. 서버: socket.join("room:{roomId}")
```

### 6.3 블록체인 기록 (계획)
```
게임 종료
    ↓
MySQL에 게임 결과 저장 (즉시) ✅
    ↓
플레이어 통계 업데이트 ✅
    ↓
사용자에게 응답 반환 (빠름) ✅
    ↓
블록체인 기록 (백그라운드, 비동기) ⏳
    ↓
MySQL에 txHash 업데이트 ⏳

※ 블록체인 실패해도 게임 결과는 MySQL에 보존됨
```

---

## 7. API 명세

### 7.1 인증 API (`/api/auth`)

| Method | Endpoint | 설명 | Body |
|--------|----------|------|------|
| POST | `/signup` | 회원가입 | `{ email, password }` |
| POST | `/emailauth` | 이메일 인증 | `{ email, code }` |
| POST | `/login` | 로그인 | `{ email, password }` |
| POST | `/logout` | 로그아웃 | - |

### 7.2 사용자 API (`/api/user`) - 인증 필요

| Method | Endpoint | 설명 | Body |
|--------|----------|------|------|
| GET | `/me` | 내 정보 조회 | - |
| POST | `/change_nickname` | 닉네임 변경 | `{ nickname }` |

### 7.3 게임 API (`/api/games`) - 인증 필요

| Method | Endpoint | 설명 | Body/Query |
|--------|----------|------|------------|
| GET | `/page` | 방 목록 조회 | `?page=1&size=4` |
| POST | `/create` | 방 생성 | `{ roomName, password? }` |
| POST | `/enter` | 방 입장 | `{ roomId, passwordInput? }` |

### 7.4 Socket 이벤트

| 이벤트 | 방향 | 설명 | 데이터 |
|--------|------|------|--------|
| `move` | C→S | 위치 이동 | `{ type, roomId? }` |
| `chat message` | C↔S | 채팅 | `{ message }` |
| `heartbeat` | C→S | 연결 유지 | - |
| `onlineUsers` | C↔S | 온라인 목록 | - |
| `disconnect` | - | 연결 해제 | - |

---

## 8. 개발 환경 실행

### 8.1 사전 요구사항
- Docker & Docker Compose
- Node.js 18+ (블록체인 개발 시)
- Make (선택사항)

### 8.2 실행 명령어

```bash
# 개발 환경 시작
make dev_up
# 또는
cd docker && docker-compose --profile dev up

# 개발 환경 종료
make dev_down

# 프로덕션 환경 시작
make up

# 완전 초기화 (볼륨 삭제 포함)
make dev_fclean && make dev_up
```

### 8.3 접속 주소
- **개발 클라이언트**: http://localhost:5173
- **개발 서버 API**: http://localhost:3000/api
- **프로덕션**: https://localhost:8443

### 8.4 환경 변수 (.env)
```bash
# docker/.env 예시
MARIADB_ROOT_PASSWORD=your_password
MARIADB_DATABASE=ft_transcendence
JWT_SECRET=your_jwt_secret
VITE_SERVER_IP=127.0.0.1

# 블록체인 (선택)
BLOCKCHAIN_NETWORK=local
LOCAL_PRIVATE_KEY=0x...
```

---

## 9. 향후 작업

### 9.1 우선순위 높음 (게임 핵심)
1. **게임 렌더링 구현**
   - Canvas 또는 DOM 기반 카드 게임 UI
   - 카드 분배, 플레이 애니메이션

2. **게임 로직 구현**
   - 4-Card 게임 규칙 정의
   - 턴 기반 상태 머신
   - 점수 계산 및 승자 판정

3. **게임 결과 저장**
   - MySQL에 game_history 테이블 추가
   - 플레이어 승패/레이팅 업데이트

### 9.2 우선순위 중간
4. **블록체인 연동**
   - Fuji 테스트넷에 컨트랙트 배포
   - 게임 결과 기록 서비스 구현

5. **매칭 시스템 개선**
   - 자동 매칭 알고리즘
   - 레이팅 기반 매칭

### 9.3 우선순위 낮음
6. **추가 기능**
   - 친구 관리
   - 게임 초대
   - 리더보드
   - 관리자 페이지

### 9.4 기술 부채
- [ ] Password 필드 unique 제거 (user.js)
- [ ] JWT 리프레시 토큰 구현
- [ ] 에러 핸들링 표준화
- [ ] 테스트 코드 작성
- [ ] 로깅 시스템 추가

---

## 부록: 주요 파일 위치

### 인증 관련
- `server/src/services/api/auth/` - 인증 컨트롤러
- `server/src/middleware/authMiddleware.js` - JWT 검증
- `client/src/hooks/auth/` - 인증 훅

### 게임 관련
- `server/src/services/api/games/` - 게임 API
- `server/src/services/socket/socketOn/` - Socket 이벤트
- `client/src/components/ui/game/` - 게임 UI
- `client/src/hooks/game/` - 게임 훅

### 블록체인 관련
- `server/src/blockchain/` - 문서 및 컨트랙트
- `server/src/blockchain/contracts/` - Hardhat 프로젝트

---

*이 문서는 프로젝트 분석을 통해 자동 생성되었습니다.*
