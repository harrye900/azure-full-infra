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
