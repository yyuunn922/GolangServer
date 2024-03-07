package main

import (
	"encoding/json"
	"fmt"
	"github.com/pion/webrtc/v3"
	"net/http"
)

var webrtcConfig = webrtc.Configuration{ICEServers: []webrtc.ICEServer{
	{URLs: []string{"stun:stun.l.google.com:19302"}},
}}

func main() {
	http.HandleFunc("/offer", handleOffer)
	panic(http.ListenAndServe(":8080", nil))
}

func handleOffer(w http.ResponseWriter, r *http.Request) {
	peerConnection, err := webrtc.NewPeerConnection(webrtcConfig)
	if err != nil {
		http.Error(w, fmt.Sprintf("Could not create PeerConnection: %v", err), http.StatusInternalServerError)
		return
	}
	// 생성된 PeerConnection에서 수신된 DataChannel이 있을 때의 동작을 정의
	peerConnection.OnDataChannel(func(d *webrtc.DataChannel) {

		// 해당 DataChannel에서 메시지가 도착하면 그 내용을 콘솔에 출력
		d.OnMessage(func(msg webrtc.DataChannelMessage) {
			fmt.Printf("DataChannel '%s'로부터 온 메시지: '%s'\n", d.Label(), string(msg.Data))
		})
	})

	// 페이로드로 부터 SessionDescription을 디코드하고, 예를 들어 클라이언트로 부터 온 SDP가 될 것
	decoder := json.NewDecoder(r.Body)
	var offer webrtc.SessionDescription
	err = decoder.Decode(&offer)
	if err != nil {
		http.Error(w, fmt.Sprintf("SessionDescription을 디코드 할 수 없음: %v", err), http.StatusInternalServerError)
		return
	}

	// 디코딩된 SessionDescription을 RemoteDescription으로 설정
	err = peerConnection.SetRemoteDescription(offer)
	if err != nil {
		http.Error(w, fmt.Sprintf("리모트 디스크립션 설정할 수 없음: %v", err), http.StatusInternalServerError)
		return
	}

	// Answer SDP를 생성
	answer, err := peerConnection.CreateAnswer(nil)
	if err != nil {
		http.Error(w, fmt.Sprintf("sdp 생성불가 : %v", err), http.StatusInternalServerError)
		return
	}

	// 생성된 Answer SDP를 LocalDescription으로 설정
	err = peerConnection.SetLocalDescription(answer)
	if err != nil {
		http.Error(w, fmt.Sprintf("로컬 디스크립션 설정 불가: %v", err), http.StatusInternalServerError)
		return
	}

	// 생성된 Answer SDP를 전달하기 위해 인코딩 후 응답에 포함
	encoder := json.NewEncoder(w)
	err = encoder.Encode(answer)
	if err != nil {
		http.Error(w, fmt.Sprintf("인코들 할수 없음: %v", err), http.StatusInternalServerError)
		return
	}
}
