package main

import (
	"fmt"
)

func main(){
	a := 100
	b := 200

	if a < b {
		fmt.Println("B is big")
	} else if a > b {
		fmt.Println("A is big")
	} else {
		fmt.Println("A is equal to B")
	}
}
