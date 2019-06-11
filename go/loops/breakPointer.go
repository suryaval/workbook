package main

import (
	"fmt"
)

func main(){
	listA := []string{"a","b","c"}
	listB := []string{"b","c","e"}
	listC := []string{"d","b","c"}

	for _,i := range listA {
	breakPoint:
		for _,j := range listB {
			if i == j {
				for _,k := range listC {
					if i == k {
						fmt.Println("Element present in all three slices: listA, listB, listC",i)
						break breakPoint
					} else {
						fmt.Println("Element present in only two slices: listA, listB", j)
					}
				}
			} else {
				for _,k := range listC {
					if i == k {
						fmt.Println("Element is present in two slices: listA, listC", k)
					}
				}
			}
		}
	}
}
