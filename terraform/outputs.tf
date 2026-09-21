output "kube_config" {
  value     = module.aks.kube_config
  sensitive = true
}

output "cluster_name" {
  value = module.aks.cluster_name
}

output "resource_group_name" {
  value = module.aks.resource_group_name
}

output "acr_login_server" {
  value = module.aks.acr_login_server
}

output "acr_name" {
  value = module.aks.acr_name
}
