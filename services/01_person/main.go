package main

import (
	"api/routes"
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		fmt.Println("Error uai loading .env file")
	}

	router := routes.Init()

	fmt.Println("Server listening on port 4001")

	log.Fatal(http.ListenAndServe(":4001", router))
}
