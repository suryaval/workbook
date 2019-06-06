package main

import (
	"fmt"
)

func main(){
	course := "Docker Deep Dive"

	fmt.Println("You are studying the course: ",course)

	changeCourse(course)

	fmt.Println("Course value after calling changeCourse function: ",course)
}

	// & references a pointer
	// * dereferences a pointer

func changeCourse(course string) string{
	course = "Go Fundamentals"
	fmt.Println("Inside changeCourse Function, course name is changed as: ",course)
	return course
}
