package main

import (
	"fmt"
	"strings"
)

func main(){
	fName := "surya"
	lName := "vallabhaneni"
	fmt.Println(convertToTitleCase(fName,lName))
}

func convertToTitleCase(string1, string2 string) (s1, s2 string) {
	string1 = strings.Title(string1)
	string2 = strings.ToUpper(string2)
	return string1, string2
}
