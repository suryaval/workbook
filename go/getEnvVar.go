package main

import (
	"fmt"
	"os"
)

func main(){

	surya := os.Environ()

	fmt.Println("Assigning logged in username value to surya variable",surya)
}
