package main

import (
	"fmt"
)

func main(){
	scores := highestScores(23,12,123,24,43,34,234)
	fmt.Println("High scorer is", scores)
}

func highestScores(scoreList ...int) int {
		best := scoreList[0]
	for _, i := range scoreList {
		fmt.Println(i)
		if i > best {
			best = i
		}
	}
	return best
}
