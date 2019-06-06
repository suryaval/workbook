package main

import (
	"fmt"
	"runtime"
)

func main(){
	fmt.Println("Hey!", runtime.GOOS)
}
