package main

import (
	"bufio"
	"fmt"
	"net"
)

// 연결된 커넥션들을 저장합니다
var connects = make(map[net.Conn]bool)
var broadcast = make(chan string)

func main() {
	fmt.Println("소켓 서버 시작")
	// 서버를 시작합니다
	serverInstance, err := net.Listen("tcp", "localhost:8080")
	// 에러가 잡히면 메시지를 찍고 프로그램을 정지합니다
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	// 프로그램이 끝나면 서버인스턴스를 해체합니다
	defer serverInstance.Close()

	// 메시지를 커넥션에 전파합니다
	go MessageFireEvent()
	// 반복을 하며 요청이 오면 커넥션을 저장합니다
	for {
		// 소켓을 연결합니다
		connect, err := serverInstance.Accept()
		if err != nil {
			// 에러가 발생하면 메시지를 찍고, 반복을 중지합니다
			fmt.Println("소켓 연결 에러")
			fmt.Println(err.Error())
			break
		}

		// connect들을 저장소에 저장합니다
		connects[connect] = true
		// 저장한 커넥션에 메시지가 들어오면 읽도록 합니다
		fmt.Println(fmt.Sprintf("연결된 사람 : %v", len(connects)))
		go MessageHandleEvent(connect)
	}
}

// MessageFireEvent 받은 메시지를 전파합니다
func MessageFireEvent() {
	// 브로드케스트 채널에 메시지가 들어온다면, 메시지를 커넥션들에게 전파합니다
	for {
		// 브로드케스트 채널에 들어온 메시지를 변수로 넣습니다
		message := <-broadcast
		// 연결된 커넥션들에게 메시지를 전파합니다
		for connect := range connects {
			_, err := connect.Write([]byte(message))
			if err != nil {
				connect.Close()
				delete(connects, connect)
			}
		}
	}
}

// MessageHandleEvent 메시지를 받습니다
func MessageHandleEvent(connect net.Conn) {
	// 커넥션
	reader := bufio.NewReader(connect)
	for {
		data, err := reader.ReadString('\n')
		if err != nil {
			connect.Close()
			delete(connects, connect)
			fmt.Println(fmt.Sprintf("퇴장했습니다, 남은 인원 : %v", len(connects)))
			break
		}
		broadcast <- data
	}
}
