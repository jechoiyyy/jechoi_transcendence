# ft_transcendence (final subject)

hekim		Product Owner (PO)
seokson		Project Manager (PM) / Scrum Master
jechoi		Technical Lead / Architect

Failed to load resource: the server responded with a status of 404 (Not Found)
:5173/api/games?page=1&size=4:1  <게임방 목록 불러오기>

:5173/api/games/create  <게임 방 만들기>

roomId = uuid(random 16 text)
await hset(`games:createRoom:${roomId}`, { 
  roomId,
  roomName,
  mode: '4card',
  password: null,
  ownerId,
  status: 'waiting' // waiting | playing
});
SADD rooms:waiting {roomId}
SADD room:{roomId}:users userId
HSET room:{roomId}:ready userId false
EXPIRE room:{roomId} 3600
EXPIRE room:{roomId}:users 3600
EXPIRE room:{roomId}:ready 3600

roomId는 표시x 내부 변수로 가지고만 있음
클릭시 roomId 값으로 방을 찾아서 들어감 -> 
roomId 조작시 방을 못찾으므로 상관x, 방장이 roomId 바꿔도 다른 사람한테는 안바뀌므로 상관x, 게임 준비 시 방 찾고 해당 방의 해당 유저의 ready 초기화 모두 초기화 시 방에 입장 중인 모든 유저 게임 창으로 nevigate