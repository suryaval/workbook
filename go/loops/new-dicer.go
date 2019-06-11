package main

import (
	"fmt"
)

func main(){
	slicer := []string{"Surya","Vallabhaneni","12345"} //slice-1
	dicer := []string{"Vallabhaneni","12345"} //slice-2
	for i := range slicer {
		//fmt.Println("Length is:",len(slicer))
		fmt.Println("Elements number is:",i)
		//fmt.Println("Elements number is:",slicer[i])
	}

	for _, i := range slicer {
		//fmt.Println(i)
		for _, j := range dicer {
			//fmt.Println(j)
			if i == j{
				fmt.Println("i=j",i,j)
			}
		}
	}
}
