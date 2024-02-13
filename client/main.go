package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {
	conn, err := net.Dial("tcp", "localhost:8080")
	if err != nil {
		fmt.Println("커넥션 연결에 실패했어요")
		fmt.Println(err.Error())
		return
	}

	// 사용자로 텍스트를 받고 서버에 전송합니다
	go func() {
		reader := bufio.NewReader(os.Stdin)
		for {
			text, _ := reader.ReadString('\n')
			fmt.Fprint(conn, text)
		}
	}()

	// 서버에 받은 이벤트를 찍습니다
	go func() {
		reader := bufio.NewReader(conn)
		for {
			// 서버에서 메시지를 읽어요
			returnData, _ := reader.ReadString('\n')
			fmt.Println(returnData)
		}
	}()
	select {}
}
