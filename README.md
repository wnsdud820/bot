# 디스코드 관리 봇

디스코드 서버의 입장/퇴장 메시지, 자동 역할 지급, 공지 DM 발송, 초대코드 생성, 메시지 청소 기능을 제공하는 Discord.js 기반 봇입니다.

## 주요 기능

* 서버 입장 시 환영 메시지 전송
* 서버 입장 시 자동 역할 지급
* 서버 퇴장 시 퇴장 메시지 전송
* `!ping` 명령어로 봇 상태 확인
* `!help` 명령어로 명령어 목록 확인
* `!embed` 명령어로 임베드 예제 출력
* `!si` 명령어로 봇/서버 정보 확인
* `!초대코드` 명령어로 서버 초대 링크 생성
* `!청소 숫자` 명령어로 메시지 삭제
* `!전체공지 내용` 명령어로 서버 멤버에게 DM 공지 전송
* `!전체공지2 내용` 명령어로 임베드 형식 DM 공지 전송

## 사용 기술

* Node.js
* Discord.js
* Moment.js
* Moment Duration Format

## 설치 방법

먼저 Node.js를 설치한 뒤, 프로젝트 폴더에서 아래 명령어를 실행합니다.

```bash
npm init -y
npm install discord.js@12 moment moment-duration-format
```

## 파일 구성 예시

```txt
discord-bot/
├── index.js
├── package.json
└── README.md
```

## 봇 실행 전 준비

`index.js` 상단에 아래 코드를 추가해야 합니다.

```js
const moment = require("moment")
require("moment-duration-format")
```

그리고 봇 토큰을 설정합니다.

Heroku 또는 환경변수를 사용할 경우:

```js
const token = process.env.token
```

직접 토큰을 넣을 경우:

```js
const token = "디스코드 봇 토큰"
```

## 설정 값 수정

아래 부분을 자신의 서버에 맞게 수정하세요.

```js
const welcomeChannelName = "안녕하세요"
const byeChannelName = "안녕히가세요"
const welcomeChannelComment = "어서오고"
const byeChannelComment = "퇴장 메시지"
const roleName = "게스트"
```

### 설정 설명

| 설정 이름                   | 설명                    |
| ----------------------- | --------------------- |
| `welcomeChannelName`    | 유저 입장 시 메시지를 보낼 채널 이름 |
| `byeChannelName`        | 유저 퇴장 시 메시지를 보낼 채널 이름 |
| `welcomeChannelComment` | 입장 시 보낼 환영 메시지        |
| `byeChannelComment`     | 퇴장 시 보낼 메시지           |
| `roleName`              | 입장 시 자동으로 지급할 역할 이름   |

## 실행 방법

```bash
node index.js
```

정상적으로 실행되면 콘솔에 아래 문구가 출력됩니다.

```txt
켰다.
```

## 명령어 목록

| 명령어         | 설명                                      |
| ----------- | --------------------------------------- |
| `!ping`     | 봇이 정상 작동 중인지 확인합니다.                     |
| `!help`     | 사용 가능한 명령어 목록을 보여줍니다.                   |
| `!embed`    | 임베드 메시지 예제를 출력합니다.                      |
| `!si`       | 봇의 RAM 사용량, 실행 시간, 서버 수, 유저 수 등을 보여줍니다. |
| `!초대코드`     | 현재 채널의 서버 초대 링크를 생성합니다.                 |
| `!청소 숫자`    | 입력한 숫자만큼 메시지를 삭제합니다.                    |
| `!전체공지 내용`  | 서버 멤버에게 일반 DM 공지를 전송합니다.                |
| `!전체공지2 내용` | 서버 멤버에게 임베드 형식 DM 공지를 전송합니다.            |

## 관리자 권한이 필요한 명령어

아래 명령어는 `MANAGE_MESSAGES` 권한이 있어야 사용할 수 있습니다.

```txt
!청소
!전체공지
!전체공지2
```

권한이 없으면 아래와 같은 메시지가 출력됩니다.

```txt
명령어를 수행할 관리자 권한을 소지하고 있지않습니다.
```

## 봇 초대 시 필요한 권한

봇을 서버에 초대할 때 아래 권한을 허용해야 정상 작동합니다.

* 메시지 보내기
* 메시지 관리
* 역할 관리
* 초대 만들기
* 멤버 보기
* 임베드 링크
* DM 보내기

특히 자동 역할 지급 기능을 사용하려면 봇의 역할이 지급하려는 역할보다 위에 있어야 합니다.

## 디스코드 개발자 포털 설정

봇이 멤버 입장 이벤트를 감지하려면 Discord Developer Portal에서 아래 설정을 켜야 합니다.

1. Discord Developer Portal 접속
2. Application 선택
3. Bot 메뉴 이동
4. Privileged Gateway Intents 설정
5. `SERVER MEMBERS INTENT` 활성화
6. `MESSAGE CONTENT INTENT`가 필요한 경우 활성화

## 주의사항

현재 코드는 Discord.js v12 문법을 기준으로 작성되어 있습니다.

따라서 최신 Discord.js v14를 사용할 경우 코드 수정이 필요합니다.

권장 설치 버전:

```bash
npm install discord.js@12
```

## 자주 발생하는 오류

### Cannot read property 'send' of undefined

입장 또는 퇴장 메시지를 보낼 채널 이름이 잘못된 경우 발생합니다.

아래 값이 실제 서버 채널 이름과 같은지 확인하세요.

```js
const welcomeChannelName = "안녕하세요"
const byeChannelName = "안녕히가세요"
```

### 역할 지급이 되지 않는 경우

아래 사항을 확인하세요.

* `roleName`에 적은 역할 이름이 실제 서버 역할 이름과 같은지 확인
* 봇에게 `역할 관리` 권한이 있는지 확인
* 봇의 역할 위치가 지급하려는 역할보다 위에 있는지 확인

### moment is not defined

`moment`를 불러오지 않아서 발생하는 오류입니다.

`index.js` 상단에 아래 코드를 추가하세요.

```js
const moment = require("moment")
require("moment-duration-format")
```

그리고 아래 패키지를 설치하세요.

```bash
npm install moment moment-duration-format
```

### message.member.hasPermission is not a function

Discord.js v13 이상을 사용하면 발생할 수 있습니다.

이 코드는 Discord.js v12 기준이므로 아래 명령어로 v12를 설치하세요.

```bash
npm install discord.js@12
```

## 라이선스

이 프로젝트는 자유롭게 수정하고 사용할 수 있습니다.
