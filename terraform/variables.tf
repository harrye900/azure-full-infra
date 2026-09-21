variable "resource_group_name" {
  default = "ecommerce-rg"
}

variable "location" {
  default = "East US"
}

variable "cluster_name" {
  default = "ecommerce-aks"
}

variable "node_count" {
  default = 2
}

variable "vm_size" {
  default = "Standard_D2_v2"
}

variable "tags" {
  type    = map(string)
  default = {
    environment = "dev"
    project     = "ecommerce"
  }
}

variable "acr_name" {
  default = "ecommerceacr"
}
