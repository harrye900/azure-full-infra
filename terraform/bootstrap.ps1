# Run this ONCE before terraform pipeline to set up remote backend
# Usage: .\bootstrap.ps1

$ResourceGroup   = "ecommerce-rg"
$StorageAccount  = "ecommercetfstate23"
$Container       = "tfstate"
$Location        = "eastus"

Write-Host "Creating resource group..." -ForegroundColor Cyan
New-AzResourceGroup -Name $ResourceGroup -Location $Location -Force

Write-Host "Creating storage account..." -ForegroundColor Cyan
New-AzStorageAccount -Name $StorageAccount -ResourceGroupName $ResourceGroup -SkuName Standard_LRS -Location $Location

Write-Host "Creating tfstate container..." -ForegroundColor Cyan
$ctx = (Get-AzStorageAccount -ResourceGroupName $ResourceGroup -Name $StorageAccount).Context
New-AzStorageContainer -Name $Container -Context $ctx

Write-Host "Bootstrap complete! Run terraform-pipeline now." -ForegroundColor Green
