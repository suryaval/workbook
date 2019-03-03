package main

import (
	"fmt"
	"math/rand"
	"math"
)

func add(x int, y int) int {
	return x + y
}

func add2(x, y int) int {
	return x + y
}

func main() {
	fmt.Println("Using Math Random function", rand.Intn(100))

	fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))

	fmt.Println(math.Pi)

	// add function
	fmt.Println("Outcome of add function", add(30,40))

	// add2 function
	fmt.Println("Outcome of add2 function", add2(10,20))

}