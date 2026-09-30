#!/bin/bash
# Run this ONCE before terraform init to set up the remote backend
# Usage: bash bootstrap.sh

RESOURCE_GROUP="ecommerce-rg"
STORAGE_ACCOUNT="ecommercetfstate23"
CONTAINER="tfstate"
LOCATION="eastus"

echo "Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

echo "Creating storage account..."
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --sku Standard_LRS \
  --location $LOCATION

echo "Creating tfstate container..."
az storage container create \
  --name $CONTAINER \
  --account-name $STORAGE_ACCOUNT

echo "Done! Now run: terraform init"
