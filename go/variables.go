package main

import (
	"fmt"
	"reflect"
)

var (
	name, course string
	chapter		 float64
)

func main(){
	fmt.Println("Variable name value is: ",name)
	fmt.Println("Variable course value is: ",course)
	fmt.Println("Variable chapter value is: ",chapter)

	fmt.Println("Variable name type is: ",reflect.TypeOf(name))
	fmt.Println("Variable course type is: ",reflect.TypeOf(course))
	fmt.Println("Variable chapter type is: ",reflect.TypeOf(chapter))
}
