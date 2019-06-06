package main

import (
	"fmt"
)

func main() {
	surya := "vallabhaneni"
	ptr := &surya

	fmt.Println("Memory address of variable is: ", &surya)
	fmt.Println("value hold by the pointer is: ",*ptr)
	fmt.Println("Value of the pointer is:",ptr)


}
