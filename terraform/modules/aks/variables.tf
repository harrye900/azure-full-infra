variable "resource_group_name" {
  type        = string
  description = "Name of the resource group"
}

variable "location" {
  type        = string
  description = "Azure region"
  default     = "East US"
}

variable "cluster_name" {
  type        = string
  description = "AKS cluster name"
}

variable "node_count" {
  type        = number
  description = "Number of nodes in the default node pool"
  default     = 2
}

variable "vm_size" {
  type        = string
  description = "VM size for nodes"
  default     = "Standard_D2_v2"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to resources"
  default     = {}
}

variable "acr_name" {
  type        = string
  description = "Azure Container Registry name (must be globally unique, alphanumeric only)"
}

variable "vnet_address_space" {
  type        = string
  description = "Address space for the VNet"
  default     = "10.0.0.0/8"
}

variable "aks_subnet_prefix" {
  type        = string
  description = "Subnet prefix for AKS nodes"
  default     = "10.1.0.0/16"
}
