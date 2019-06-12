package main

import (
	"fmt"
)

func main(){
	aList := []int{0,1,2,3,4,5}
	newList := aList[1:4]
	fmt.Printf("%d",newList[1])
  	fmt.Printf("%d",newList)
}
