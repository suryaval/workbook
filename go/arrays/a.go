package main

import (
	"fmt"
)

func main(){
	myList := make([]string, 5, 10)
	fmt.Printf("length is: %d\n capacity is: %d\n",len(myList),cap(myList))
	
}
