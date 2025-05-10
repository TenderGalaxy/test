TRACK = api.getPlayerId("fenl_")
vel = [0,0,0]
pos = [0,0,0]
m = 0
function tick(){
	m++

	if(api.getPosition(TRACK) != null){
		pos.push(api.getPosition(TRACK))
	}

	if(pos.length > 20){
		pos.shift()
	}

	vel = [0,0,0]
	for(let i = 1; i < pos.length; i++){
		for(let i1 = 0; i1 < 3; i1++){
			delta = pos[i-1][i1] - pos[i][i1]
			vel[i1] += Math.abs(delta)
		}
	}
	for(let i = 0; i < 3; i++){
		vel[i] = (vel[i] / pos.length) * 20
		vel[i] = Math.floor(vel[i] * 1000)/1000
	}
}
function onPlayerChat(id, msg){
	if(msg.startsWith("!speed")){
		api.broadcastMessage(`X: ${vel[0]}, Y: ${vel[1]}, Z: ${vel[2]}`)
		return false
	}
	if(msg.startsWith("!track")){
		k = ""
		for(let i = 7; i < msg.length; i++){
			k += msg[i]
		}
		k = api.getPlayerId(k)
		if(k != null){
			api.broadcastMessage('SUCCESS')
			TRACK = k
		}
		return false
	}
	return true
}
