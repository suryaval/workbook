package main

import (
	"fmt"
)

func main(){
	a := "surya"
	b := "vallabhaneni"

	switch a {
	case b: 
		fmt.Println("Not a Match")
	case "surya":
		fmt.Println("Found a Match")
		fallthrough
	default:
		fmt.Println("No Luck")
	}
}
