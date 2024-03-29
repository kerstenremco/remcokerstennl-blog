provider "aws" {
  region = "eu-central-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

terraform {
  backend "local" {
    path = "/Users/remcokersten/tf/remcokerstennl.tfstate"
  }
}
